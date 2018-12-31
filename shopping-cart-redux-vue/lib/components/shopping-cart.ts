import { VueActor } from 'tarant-vue'
import { StoreProtocol, StoreState } from '../store';
import { Topic } from 'tarant';
import { ActionsProtocol, Actions } from '../actions';

type ShoppingCartItem = { title: string, price: number, quantity: number }

export default class ShoppingCart extends VueActor {
    public readonly template: string = `
    <div>
        <hr />
        <h2>Your cart</h2>
        <div v-if="carEmpty === true">
            <i>Please add some products to cart.</i>
        </div>
        <div v-else>
            <div v-for="item in shoppingCart">
                <p><b>{{ item.title }}</b> - \${{ item.price }} - <i> x {{ item.quantity }} </i></p>
            </div>
        </div>
        <p>Total: \${{ totalPrice }}</p>
        <button :disabled="carEmpty" @click="checkout">Checkout</button>
    </div>`

    private readonly actions: Actions;
    private shoppingCart: Array<ShoppingCartItem>
    private totalPrice: number
    private carEmpty: boolean

    constructor(store: Topic<StoreProtocol>, actions: Actions) {
        super("shopping-cart")
        this.shoppingCart = []
        this.actions = actions
        this.totalPrice = 0
        this.carEmpty = true

        this.subscribeToTopic(store)
    }

    public onStoreChanged(state: StoreState): void {
        this.shoppingCart = state.shoppingCart.products.map(({product, count}) => ({ 
            title: product.title,
            price: product.price,
            quantity: count
        }))

        this.totalPrice = state.shoppingCart.totalPrice
        this.carEmpty = this.shoppingCart.length === 0
    }

    public checkout(): void {
        this.actions.checkout()
    }
}