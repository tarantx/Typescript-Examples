import { VueActor } from 'tarant-vue'
import { StoreProtocol, StoreState } from '../store/store';
import { Topic } from 'tarant';
import { ActionsProtocol, Actions } from '../actions';

type ProductInfo = { title: string, price: number, stock: number }

export default class ProductList extends VueActor {
    private readonly actions: Actions;
    public readonly template: string = `
    <div>
        <hr />
        <h2>Products</h2>
        <div v-for="product in products">
            <p><b>{{ product.title }}</b> - \${{ product.price }} - <i> x {{ product.stock }} </i></p>
            <p><button :disabled="product.stock === 0" @click="onAddToCart(product)">Add to cart</button></p>
        </div>
    </div>
    `
    private products: Array<ProductInfo>

    constructor(store: Topic<StoreProtocol>, actions: Actions) {
        super("product-list")
        this.products = []
        this.actions = actions
        this.subscribeToTopic(store)
    }

    public onStoreChanged(state: StoreState): void {
        this.products = []
        state.products.stock.forEach(productInfo => {
            this.products = this.products.concat([{ title: productInfo.product.title, price: productInfo.product.price, stock: productInfo.stock }])
        })
    }

    public onAddToCart(product: ProductInfo): void {
        this.actions.addToCart(product.title)
    }
}