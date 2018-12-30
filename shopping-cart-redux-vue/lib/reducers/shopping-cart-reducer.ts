import { Actor, Topic } from 'tarant'
import { IProduct } from '../domain/shop';
import { ActionsProtocol } from '../actions';
import { Store } from '../store/store';

export type ShoppingCartReducerState = {
    totalPrice: number,
    products: Array<
        { product: IProduct, totalPrice: number, count: number }
    >,
    stock: Map<string, { product: IProduct, stock: number }>,
    error: string | undefined
}

export const initialShoppingCartState = () => Object.create({totalPrice: 0, products: [], error: undefined})

export default class ShoppingCartReducer extends Actor {
    private state: ShoppingCartReducerState
    private readonly store: Store

    constructor(actions: Topic<ActionsProtocol>, store: Store) {
        super('reducers/products')
        this.state = initialShoppingCartState()
        this.store = store
        this.subscribeToTopic(actions)
    }

    onAddToCart(productTitle: string): void {
        const stock = this.state.stock.get(productTitle)
        if (stock !== undefined && stock.stock > 0) {
            this.__addProductToList(stock.product)
            this.__updateTotalPrice()
            this.__updateStockOf(stock)
        } else {
            this.state.error = 'NOT_ENOUGH_STOCK'
        }

        this.store.propagateState('shoppingCart', this.state)
    }

    onRetrievedAllProducts(allProducts: IProduct[]): void {
        this.state.stock = new Map()
        allProducts.forEach(product => this.state.stock.set(product.title, { product, stock: product.quantity }))
        this.store.propagateState('shoppingCart', this.state)
    }

    onCheckout() {
        this.state.products = []
        this.state.totalPrice = 0
        this.store.propagateState('shoppingCart', this.state)
    }

    private __addProductToList(product: IProduct): void {
        const foundProduct = this.state.products.filter(p => p.product.title === product.title)
        const base: { product: IProduct, totalPrice: number, count: number } = foundProduct.length > 0 ? foundProduct[0] : { product, totalPrice: 0, count: 0 }

        base.count++
        base.totalPrice = base.count * base.product.price

        this.state.products = this.state.products.filter(p => p.product.title !== product.title).concat(base)
    }
    
    private __updateTotalPrice(): void {
        this.state.totalPrice = this.state.products.map(product => product.totalPrice).reduce((a, b) => a + b, 0)
    }

    private  __updateStockOf(stock: { product: IProduct, stock: number }): any {
        this.state.stock.set(stock.product.title, { product: stock.product, stock: stock.stock - 1 })
    }
}