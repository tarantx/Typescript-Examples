
import { ActorSystem, ActorSystemConfigurationBuilder, Actor } from 'tarant'
import AppActor from './AppActor';
import { VueRenderer } from 'tarant-vue';
import IResolver from 'tarant/dist/actor-system/resolver/resolver';
import axios from 'axios';

class RemoteResolver implements IResolver {
  resolveActorById(id: string): Promise<Actor>{
   return axios.get(`/sync/${id}`)
   .then(result => Object.assign(eval(`new ${result.data.type}("${id}")`),result.data));
  }
} 

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.withMaterializers([new VueRenderer()])
.withResolvers([new RemoteResolver()])
.done()) 

window.onload = () => {
  self.AppActor = AppActor
  system.actorFor("app")
}
