
import { ActorSystem, ActorSystemConfigurationBuilder, IMaterializer, ActorMessage } from '@wind-js/actor'
import AppActor from './Actor/AppActor';
import { VueRenderer } from './Models/VueRenderer';

window.onload = () => {
  const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
  .withMaterializer(new VueRenderer())
  .done())  
  system.actorOf(AppActor, [])
}
