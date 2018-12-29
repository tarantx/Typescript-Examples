
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import AppActor from '../domain/AppActor';
import { VueRenderer } from 'tarant-vue';
import { RemoteResolver } from '../modules/sync/RemoteResolver';

const remote = new RemoteResolver()

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.withMaterializers([new VueRenderer(), remote])
.withResolvers([remote])
.done()) 

window.onload = () => {
  self.AppActor = AppActor
  system.actorFor("app")
}
