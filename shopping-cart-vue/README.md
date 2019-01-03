# shopping-cart-vue

This example shows a proposed architecture based on event driven architectures for UI composition. The architecture is as
follows:

1. There are [domain objects](./domain/), with domain related business logic. 
Examples of logic that could be included here are:
    * Domain logic, like computing totals in the shopping cart
    * Infrastructure logic, like querying state from the backend

2. There are [components](./components/), with the rendering and event handling logic. Vue components will be here.

3. Communication between components and domain objects is direct (a message to a single actor). For example, for doing
the checkout of the shopping cart, the [ShoppingCartComponent](./components/shopping-cart.ts) will send a direct message
to the [ShoppingCart](./domain/shopping-cart.ts) domain object. As in:

```js
checkout(): void {
    this.shoppingCart.checkout()
}
```

4. Communication between domain objects and components is through a topic. With this pattern, you can have several
components reading from domain events. For example:

```js
// index.js
const shoppingCartProtocol = Topic.for(system, 'shopping-cart', ShoppingCartProtocol)
// domain/shopping-cart.ts
constructor(stock: Stock, protocol: ShoppingCartProtocol) {
    super()

    this.stock = stock
    this.items = []
    this.protocol = protocol
}

checkout() {
    this.items = []
    this.protocol.onCartChanged(this.items, 0)
}
```

How to run
-----------

```sh
yarn install
yarn build

open dist/index.html
```

* Getting the shop information is delayed for 500ms
* Adding an item to a cart is delayed for 250ms
* When an item is added to the shopping cart, the vue component is delayed for 1s, so the product list will update quicker

**Fun fact:** Try to add more than the limit of items, you'll see that it's not possible (even if actors are really slow), because actors are transactional and receive messages one by one.