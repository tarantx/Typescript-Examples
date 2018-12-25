import Vue from 'vue'
import App from './App.vue'
import { Actor, IMaterializer, ActorSystem, ActorSystemConfigurationBuilder, ActorMessage } from '@wind-js/actor'

abstract class VueActor extends Actor {
  abstract bind(): void; 
}
class AppActor extends VueActor {
  constructor() {
    super()
    this.actorOf
  }

  public bind() {
    new Vue({
      el: '#app',
      render: h => h(App),
      components: { App }
    })
  }
}

class VueRenderer implements IMaterializer {
  onInitialize(actor: VueActor): void {
    actor.bind()
  }

  onBeforeMessage(actor: VueActor, message: ActorMessage): void{
  }

  onAfterMessage(actor: VueActor, message: ActorMessage): void{
  }
    
  onError(actor: VueActor, message: ActorMessage, error: any): void{
  }
}



window.onload = () => {
  /* eslint-disable no-new */
  const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
  .withMaterializer(new VueRenderer())
  .done())  
  
  system.actorOf(AppActor, [])

}
