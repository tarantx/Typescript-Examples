import { Actor } from "tarant";
import simulateLoad from '../infrastructure/simulate-load'
import { stringify } from 'querystring';

export interface IProduct {
    stock: number
    price: number,
    title: string
}

export const KNOWN_PRODUCTS: ReadonlyArray<IProduct> = [
    { title: 'iPad 4 Mini', stock: 2, price: 500.01 },
    { title: 'H&M T-Shirt White', stock: 10, price: 10.99 },
    { title: 'Charli XCX - Sucker CD', stock: 5, price: 19.99 },
]

export class Stock extends Actor {
    private readonly stock: Map<string, IProduct> 
    private readonly protocol: StockProtocol

    constructor(protocol: StockProtocol) {
        super()

        this.stock = new Map(KNOWN_PRODUCTS.map(product => [ product.title, product ] as [string, IProduct]))
        this.protocol = protocol
    }

    async loadProducts() {
        await simulateLoad(500)
        this.protocol.onStockChanged(Array.from(this.stock.values()))
    }
    
    async reserveProduct(product: IProduct): Promise<IProduct> {
        const foundProduct = this.stock.get(product.title)
        if (foundProduct === undefined) {
            throw 'Non existing product title'
        }

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