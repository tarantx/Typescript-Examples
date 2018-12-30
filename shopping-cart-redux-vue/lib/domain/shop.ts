import { Actor } from 'tarant'

const simulateLoad = async () => await new Promise(r => setTimeout(r, 10))

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
        await simulateLoad()
        return KNOWN_PRODUCTS
    }
}