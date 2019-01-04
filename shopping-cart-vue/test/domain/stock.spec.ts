import { ActorSystem } from 'tarant'
import { Stock, StockProtocol, KNOWN_PRODUCTS } from '../../lib/domain/stock'

describe('Stock', () => {
    let system: ActorSystem
    let stock: Stock
    let stockProtocol: StockProtocol

    beforeEach(() => {
        system = ActorSystem.default()
        stockProtocol = {
            onStockChanged: jest.fn()
        } as unknown as StockProtocol
        stock = system.actorOf(Stock, [stockProtocol])
    })

    test('should load the list of products', async () => {
        await stock.loadProducts()
        expect(stockProtocol.onStockChanged).toHaveBeenCalledWith(KNOWN_PRODUCTS)
    })

    test('reserving a product should remove one from the stock', async () => {
        const choosenProduct = KNOWN_PRODUCTS[0]
        const currentStock = choosenProduct.stock
        const finalStock = (await stock.reserveProduct(choosenProduct)).stock
        expect(finalStock).toBe(currentStock - 1)
    })
})