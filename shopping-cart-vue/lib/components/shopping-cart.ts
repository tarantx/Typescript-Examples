import { VueActor } from 'tarant-vue'
import { ICartItem, ShoppingCartProtocol, ShoppingCart } from '../domain/shopping-cart';
import { Topic } from 'tarant';
import simulateLoad from '../infrastructure/simulate-load';

export class ShoppingCartComponent extends VueActor {
    private readonly shoppingCart: ShoppingCart
    public readonly template: string = `
    <div>
        <hr />
        <h2>Your cart</h2>
        <div v-if="cartEmpty === true">
            <i>Please add some products to cart.</i>
        </div>
        <div v-else>
            <div v-for="item in shoppingCartItems">
                <p><b>{{ item.title }}</b> - \${{ item.price }} - <i> x {{ item.quantity }} </i></p>
            </div>
        </div>
        <p>Total: \${{ totalPrice }}</p>
        <button :disabled="cartEmpty" @click="checkout">Checkout</button>
    </div>`

    private shoppingCartItems: ICartItem[]
    private totalPrice: number
    private cartEmpty: boolean

    constructor(shoppingCart: ShoppingCart, cartProtocol: Topic<ShoppingCartProtocol>) {
        super("shopping-cart")
        this.shoppingCart = shoppingCart
        this.shoppingCartItems = []
        this.totalPrice = 0
        this.cartEmpty = true
        this.subscribeToTopic(cartProtocol)
    }

    async onCartChanged(items: ICartItem[], totalPrice: number): Promise<void> {
        await simulateLoad(250)

        this.shoppingCartItems = items
        this.totalPrice = totalPrice
        this.cartEmpty = this.shoppingCartItems.length === 0    
    }

    checkout(): void {
        this.shoppingCart.checkout()
    }
}