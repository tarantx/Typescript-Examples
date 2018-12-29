
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import { VueRenderer } from 'tarant-vue';
import { RemoteResolver } from '../modules/sync/RemoteResolver';
import AppActor from '../domain/AppActor';

const remote = new RemoteResolver()

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.withMaterializers([new VueRenderer(), remote])
.withResolvers([remote])
.done()) 

window.onload = () => {
    system
    .actorFor("app")
    .catch(() => system.actorOf(AppActor, ["app"]))
}
