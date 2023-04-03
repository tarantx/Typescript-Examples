import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import { RemoteResolverMaterializer } from "tarant-sync-client"
import { config } from "../AppConfig"
import AppActor from "../domain"
import { ReactRenderer } from 'tarant-react'
import { LocalStorageMaterializer } from "tarant-local-storage";

const remote = new RemoteResolverMaterializer(config)
const localStorage = LocalStorageMaterializer.create(config)

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.withMaterializers([new ReactRenderer(), localStorage, remote as any])
.withResolvers([localStorage, remote as any])
.done()) 

system
    .actorFor("app")
    .catch(() => Promise.resolve(system.actorOf(AppActor, ["app"])))

