import { ActorSystem, Topic } from "tarant";
import { ActionsProtocol } from "../../lib/actions";
import { Store } from "../../lib/store";
import { IProduct } from "../../lib/domain/shop";
import ShoppingCartReducer from "../../lib/reducers/shopping-cart-reducer";

const ALL_PRODUCTS: Array<IProduct> = [
    { quantity: 2, price: 50, title: 'Something' }
]

describe('ShoppingCartReducer', () => {
    let system: ActorSystem
    let store: Store
    let actions: Topic<ActionsProtocol>
    let shoppingCartReducer: ShoppingCartReducer

    beforeEach(() => {
        system = ActorSystem.default()
        actions = Topic.for(system, 'xxx', ActionsProtocol)
        store = {
            propagateState: jest.fn()
        } as unknown as any
        shoppingCartReducer = system.actorOf(ShoppingCartReducer, [actions, store])
    })

    afterEach(() => {
        system.free()
    })

    test('that onAddToCart adds an existing product', async () => {
        await shoppingCartReducer.onRetrievedAllProducts(ALL_PRODUCTS)
        await shoppingCartReducer.onAddToCart(ALL_PRODUCTS[0].title)

        expect(store.propagateState).toHaveBeenCalledWith('shoppingCart', {
               "products": [
                  {
                   "count": 1,
                   "product":  {
                     "price": 50,
                     "quantity": 2,
                     "title": "Something",
                   },
                   "totalPrice": 50,
                 },
               ],
               "stock": new Map([[
                 "Something", {
                   "product": {
                     "price": 50,
                     "quantity": 2,
                     "title": "Something",
                   },
                   "stock": 1,
                 },
                ]]),
               "totalPrice": 50,
             })
    })
})