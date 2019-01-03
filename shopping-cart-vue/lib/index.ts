import { ActorSystem, ActorSystemConfigurationBuilder, Topic } from 'tarant'
import { VueRenderer } from 'tarant-vue'
import { StockProtocol, Stock } from './domain/stock'
import { ShoppingCartProtocol, ShoppingCart } from './domain/shopping-cart'
import { ProductListComponent } from './components/product-list'
import { ShoppingCartComponent } from './components/shopping-cart'

window.onload = () => {
  const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
        .withMaterializers([new VueRenderer()])
        .done())  

  const stockProtocol = Topic.for(system, 'stock', StockProtocol) 
  const shoppingCartProtocol = Topic.for(system, 'shopping-cart', ShoppingCartProtocol)

  const stock = system.actorOf(Stock, [stockProtocol])
  const shoppingCart = system.actorOf(ShoppingCart, [stock, shoppingCartProtocol])

  const productListComponent = system.actorOf(ProductListComponent, [shoppingCart, stockProtocol])
  const shoppingCartComponent = system.actorOf(ShoppingCartComponent, [shoppingCart, shoppingCartProtocol])

  setTimeout(() => stock.loadProducts(), 0)
}
