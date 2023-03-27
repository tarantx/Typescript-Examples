import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import { RemoteResolverMaterializer } from "tarant-sync-client"
import { config } from "../AppConfig"
import AppActor from "../domain"
import { ReactRenderer } from './ReactRenderer'

const remote = new RemoteResolverMaterializer(config)

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.withMaterializers([new ReactRenderer(), remote as any])
.withResolvers([remote as any])
.done()) 

system
    .actorFor("app")
    .catch(() => Promise.resolve(system.actorOf(AppActor, ["app"])))

