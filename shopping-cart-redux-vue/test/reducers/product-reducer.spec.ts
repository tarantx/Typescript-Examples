import { ActorSystem, Topic } from "tarant";
import { ActionsProtocol, Actions } from "../../lib/actions";
import { Store } from "../../lib/store";
import ProductReducer from "../../lib/reducers/product-reducer";
import { IProduct } from "../../lib/domain/shop";

const ALL_PRODUCTS: Array<IProduct> = [
    { quantity: 2, price: 50, title: 'Something' }
]

describe('ProductReducer', () => {
    let system: ActorSystem
    let protocol: ActionsProtocol
    let store: Store
    let actions: Topic<ActionsProtocol>
    let productReducer: ProductReducer

    beforeEach(() => {
        system = ActorSystem.default()
        actions = Topic.for(system, 'xxx', ActionsProtocol)
        store = {
            propagateState: jest.fn()
        } as unknown as any
        productReducer = system.actorOf(ProductReducer, [actions, store])
    })

    afterEach(() => {
        system.free()
    })

    test('that onAddToCart adds an existing product', async () => {
        await productReducer.onRetrievedAllProducts(ALL_PRODUCTS)
        await productReducer.onAddToCart(ALL_PRODUCTS[0].title)

        expect(store.propagateState).toHaveBeenCalledWith('products', {
            "stock": new Map([["Something",
                {
                    "product": {
                      "price": 50,
                      "quantity": 2,
                      "title": "Something",
                    },
                    "stock": 1
            }]])
        })
    })
})