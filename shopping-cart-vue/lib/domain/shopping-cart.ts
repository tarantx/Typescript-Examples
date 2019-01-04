import { Actor } from "tarant";
import { IProduct, Stock } from "./stock";
import simulateLoad from '../infrastructure/simulate-load'

export interface ICartItem {
    title: string,
    price: number,
    quantity: number
}

export class ShoppingCart extends Actor {
    private readonly items: Map<string, ICartItem>
    private readonly stock: Stock
    private readonly protocol: ShoppingCartProtocol

    constructor(stock: Stock, protocol: ShoppingCartProtocol) {
        super()

        this.stock = stock
        this.items = new Map()
        this.protocol = protocol
    }

    async addProduct(desiredProduct: IProduct): Promise<void> {
        await simulateLoad(250)
        
        const product = await this.stock.reserveProduct(desiredProduct)
        const item = this.items.get(product.title) || { title: product.title, price: product.price, quantity: 0 }
        item.quantity++
        this.items.set(item.title, item)

        const itemArray = Array.from(this.items.values())
        const totalPrice = itemArray.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0)
   
        this.protocol.onCartChanged(itemArray, totalPrice)
    }

    checkout() {
        this.items.clear()
        this.protocol.onCartChanged([], 0)
    }
}

export class ShoppingCartProtocol extends Actor {
    public constructor() { super() }
    
    onCartChanged(items: ICartItem[], totalPrice: number) {}
}