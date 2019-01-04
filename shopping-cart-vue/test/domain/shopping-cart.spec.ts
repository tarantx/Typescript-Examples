import { ActorSystem } from 'tarant'
import { ShoppingCart, ShoppingCartProtocol } from '../../lib/domain/shopping-cart'
import { Stock } from '../../lib/domain/stock';

const SOME_PRODUCT = { title: 'My Product', price: 50, stock: 1 }
describe('ShoppingCart', () => {
    let system: ActorSystem
    let shoppingCart: ShoppingCart
    let stock: Stock
    let shoppingCartProtocol: ShoppingCartProtocol

    beforeEach(() => {
        system = ActorSystem.default()
        
        stock = {
            reserveProduct: jest.fn()
        } as unknown as Stock
        
        shoppingCartProtocol = {
            onCartChanged: jest.fn()
        } as unknown as ShoppingCartProtocol
        
        (stock.reserveProduct as any).mockReturnValue(SOME_PRODUCT)
        shoppingCart = system.actorOf(ShoppingCart, [stock, shoppingCartProtocol])
    })

    test('adding a product should compute the total price of the shopping cart', async () => {
        await shoppingCart.addProduct(SOME_PRODUCT)
        expect(shoppingCartProtocol.onCartChanged)
            .toHaveBeenCalledWith([{ title: 'My Product', price: 50, quantity: 1 }], SOME_PRODUCT.price)

        await shoppingCart.addProduct(SOME_PRODUCT)
        expect(shoppingCartProtocol.onCartChanged)
            .toHaveBeenCalledWith([{ title: 'My Product', price: 50, quantity: 2 }], SOME_PRODUCT.price * 2)
    })

    test('checking out a cart should empty it', async () => {
        await shoppingCart.addProduct(SOME_PRODUCT)
        await shoppingCart.checkout()

        expect(shoppingCartProtocol.onCartChanged)
            .toHaveBeenCalledWith([], 0)

        await shoppingCart.addProduct(SOME_PRODUCT)
        expect(shoppingCartProtocol.onCartChanged)
            .toHaveBeenCalledWith([{ title: 'My Product', price: 50, quantity: 1 }], SOME_PRODUCT.price * 1)
    })
})