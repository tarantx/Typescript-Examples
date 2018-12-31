import { Actor } from 'tarant'
import simulateLoad from '../infrastructure/simulate-load'

export interface IProduct {
    quantity: number
    price: number,
    title: string
}

const KNOWN_PRODUCTS: IProduct[] = [
    { title: 'iPad 4 Mini', quantity: 2, price: 500.01 },
    { title: 'H&M T-Shirt White', quantity: 10, price: 10.99 },
    { title: 'Charli XCX - Sucker CD', quantity: 5, price: 19.99 },
]

export class Shop extends Actor {
    constructor() {
        super()
    }

    async retrieveAllProducts(): Promise<IProduct[]> {
        await simulateLoad(500)
        return KNOWN_PRODUCTS
    }

    async getProduct(title: string): Promise<IProduct> {
        await simulateLoad(250)
        return KNOWN_PRODUCTS.filter(p => p.title === title)[0]
    }
}