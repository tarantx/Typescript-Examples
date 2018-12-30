import { Actor } from 'tarant'
import { ProductReducerState, initialProductReducerState } from '../reducers/product-reducer';
import { ShoppingCartReducerState, initialShoppingCartState } from '../reducers/shopping-cart-reducer';

export type StoreState = {
    products: ProductReducerState,
    shoppingCart: ShoppingCartReducerState
}

export class Store extends Actor {
    private readonly topic: StoreProtocol
    private state: StoreState

    constructor(topic: StoreProtocol) {
        super('store')
        
        this.topic = topic
        this.state = {
            products: initialProductReducerState(),
            shoppingCart: initialShoppingCartState()
        }
    }

    propagateState(stateName: string, state: any): void {
        this.state[stateName] = state
        this.topic.onStoreChanged(this.state)
    }
}

export class StoreProtocol extends Actor {
    constructor() {
        super()
    }
    
    onStoreChanged(state: StoreState): void {}
}