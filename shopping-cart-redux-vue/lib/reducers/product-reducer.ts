import { Actor, Topic } from 'tarant'
import { IProduct } from '../domain/shop';
import { ActionsProtocol } from '../actions';
import { Store } from '../store/store';

export type ProductReducerState = {
    stock: Map<string, { product: IProduct, stock: number }>,
    error: string | undefined
}

export const initialProductReducerState = () => Object.create({ stock: new Map(), error: undefined})

export default class ProductReducer extends Actor {
    private state: ProductReducerState
    private readonly store: Store

    constructor(actions: Topic<ActionsProtocol>, store: Store) {
        super('reducers/products')
        this.state = initialProductReducerState()
        this.store = store
        this.subscribeToTopic(actions)
    }

    onAddToCart(productTitle: string): void {
        const stock = this.state.stock.get(productTitle)
        if (stock !== undefined && stock.stock > 0) {
            this.state.stock.set(productTitle, { product: stock.product, stock: stock.stock - 1 })
        } else {
            this.state.error = 'NOT_ENOUGH_STOCK'
        }

        this.store.propagateState('products', this.state)
    }

    onRetrievedAllProducts(allProducts: IProduct[]): void {
        this.state.stock = new Map()
        allProducts.forEach(product => this.state.stock.set(product.title, { product, stock: product.quantity }))
        this.store.propagateState('products', this.state)
    }

    onCheckout() {
        return
    }
}