import { ActorSystem, ActorSystemConfigurationBuilder, Topic } from 'tarant'
import { VueRenderer } from 'tarant-vue';
import { ActionsProtocol, Actions } from './actions';
import { Shop } from './domain/shop';
import ShoppingCartReducer from './reducers/shopping-cart-reducer';
import ShoppingCart from './components/shopping-cart';
import { StoreProtocol, Store } from './store/store';
import ProductReducer from './reducers/product-reducer';
import ProductList from './components/product-list';

window.onload = () => {
  const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
        .withMaterializers([new VueRenderer()])
        .done())  

  const storeProtocol = Topic.for(system, 'store', StoreProtocol)
  const store = system.actorOf(Store, [storeProtocol])
  
  const shop = system.actorOf(Shop, [])  
  
  const actionsProtocol = Topic.for(system, 'actions', ActionsProtocol)
  const actions = system.actorOf(Actions, [actionsProtocol, shop])
  
  const shoppingCartReducer = system.actorOf(ShoppingCartReducer, [actionsProtocol, store])
  const productsReducer = system.actorOf(ProductReducer, [actionsProtocol, store])
  
  const productList = system.actorOf(ProductList, [storeProtocol, actionsProtocol])
  const shoppingCart = system.actorOf(ShoppingCart, [storeProtocol, actionsProtocol])

  actions.getAll()
}
