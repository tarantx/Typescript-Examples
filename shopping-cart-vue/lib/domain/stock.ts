import { Actor } from "tarant";
import simulateLoad from '../infrastructure/simulate-load'

export interface IProduct {
    stock: number
    price: number,
    title: string
}

const KNOWN_PRODUCTS: IProduct[] = [
    { title: 'iPad 4 Mini', stock: 2, price: 500.01 },
    { title: 'H&M T-Shirt White', stock: 10, price: 10.99 },
    { title: 'Charli XCX - Sucker CD', stock: 5, price: 19.99 },
]

export class Stock extends Actor {
    private products: IProduct[]
    private protocol: StockProtocol

    constructor(protocol: StockProtocol) {
        super()

        this.products = KNOWN_PRODUCTS
        this.protocol = protocol
    }

    async loadProducts() {
        await simulateLoad(500)
        this.protocol.onStockChanged(this.products)
    }
    
    async reserveProduct(product: IProduct): Promise<IProduct> {
        const foundProducts = this.products.filter(p => p.title === product.title)
        if (foundProducts.length !== 1) {
            throw 'Non existing product title'
        }

        const [ foundProduct ] = foundProducts

        if (foundProduct.stock <= 0) {
            throw 'There is not enough stock for product'
        }

        foundProduct.stock--

        return { ...foundProduct }
    }
}

export class StockProtocol extends Actor {
    public constructor() { super() }

    onStockChanged(products: IProduct[]) {}
}