import { Actor } from "tarant";
import { IProduct, Stock } from "./stock";
import simulateLoad from '../infrastructure/simulate-load'

export interface ICartItem {
    title: string,
    price: number,
    quantity: number
}

export class ShoppingCart extends Actor {
    private items: ICartItem[]
    private readonly stock: Stock
    private readonly protocol: ShoppingCartProtocol

    constructor(stock: Stock, protocol: ShoppingCartProtocol) {
        super()

        this.stock = stock
        this.items = []
        this.protocol = protocol
    }

    async addProduct(desiredProduct: IProduct): Promise<void> {
        await simulateLoad(250)
        
        const product = await this.stock.reserveProduct(desiredProduct)
        const itemsByTitle = this.items.filter(i => i.title === product.title)

        let item: ICartItem
        if (itemsByTitle.length === 1) {
            item = itemsByTitle[0]
        } else {
            item = { title: product.title, price: product.price, quantity: 0 }
            this.items.push(item)
        }

        item.quantity++        
        const totalPrice = this.items.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0)
        this.protocol.onCartChanged(this.items, totalPrice)
    }

    checkout() {
        this.items = []
        this.protocol.onCartChanged(this.items, 0)
    }
}

export class ShoppingCartProtocol extends Actor {
    public constructor() { super() }
    
    onCartChanged(items: ICartItem[], totalPrice: number) {}
}