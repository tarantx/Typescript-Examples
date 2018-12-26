
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import AppActor from './AppActor';
import { VueRenderer } from 'tarant-vue';

window.onload = () => {
  const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
  .withMaterializer(new VueRenderer())
  .done())  
  system.actorOf(AppActor, [])
}
