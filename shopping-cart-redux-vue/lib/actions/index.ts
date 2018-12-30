import { Actor } from 'tarant'
import { Shop, IProduct } from '../domain/shop';

export class Actions extends Actor {
    private readonly topic: ActionsProtocol
    private readonly shop: Shop;

    constructor(topic: ActionsProtocol, shop: Shop) {
        super('actions/products')
        this.topic = topic
        this.shop = shop
    }

    async getAll(): Promise<void> {
        const allProducts = await this.shop.retrieveAllProducts()
        this.topic.onRetrievedAllProducts(allProducts)
    }

    addToCart(productTitle: string): void {
        this.topic.onAddToCart(productTitle)
    }

    checkout(): void {
        this.topic.onCheckout()
    }
}

export class ActionsProtocol extends Actor {
    public constructor() {
        super()
    }
    
    onRetrievedAllProducts(products: IProduct[]): void {}
    onAddToCart(title: string): void {}
    onCheckout(): void {}
}