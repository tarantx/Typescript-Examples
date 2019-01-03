import { VueActor } from 'tarant-vue'
import { Topic } from 'tarant';
import { ShoppingCart } from '../domain/shopping-cart';
import { StockProtocol, IProduct } from '../domain/stock';

export class ProductListComponent extends VueActor {
    private readonly shoppingCart: ShoppingCart
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
    private products: IProduct[]
    
    constructor(shoppingCart: ShoppingCart, stockProtocol: Topic<StockProtocol>) {
        super("product-list")
        this.products = []
        this.shoppingCart = shoppingCart
        this.subscribeToTopic(stockProtocol)
    }

    onStockChanged(products: IProduct[]): void {
        this.products = products
    }

    onAddToCart(product: IProduct): void {
        this.shoppingCart.addProduct(product)
    }
}