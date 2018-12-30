
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import { VueRenderer } from 'tarant-vue';
import AppActor from '../domain/AppActor';
import { RemoteResolverMaterializer } from "tarant-sync-client";
import { config } from "../AppConfig";

const remote = new RemoteResolverMaterializer(config)

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.withMaterializers([new VueRenderer(), remote])
.withResolvers([remote])
.done()) 

window.onload = () => {
    system
    .actorFor("app")
    .catch(() => system.actorOf(AppActor, ["app"]))
}
