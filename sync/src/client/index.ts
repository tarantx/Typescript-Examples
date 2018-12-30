
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import { VueRenderer } from 'tarant-vue';
import AppActor from '../domain/AppActor';
import { RemoteResolverMaterializer } from "tarant-remote-sync";

const remote = new RemoteResolverMaterializer({
        sync: {
            active: true,
            delay: 1000
        },
          paths: {
              pull: "/pull", 
              push: "/push", 
          },
          ActorTypes: { AppActor: (params) => new AppActor(params) }
      })

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.withMaterializers([new VueRenderer(), remote])
.withResolvers([remote])
.done()) 

window.onload = () => {
    system
    .actorFor("app")
    .catch(() => system.actorOf(AppActor, ["app"]))
}
