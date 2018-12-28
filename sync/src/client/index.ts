
import { ActorSystem, ActorSystemConfigurationBuilder, Actor } from 'tarant'
import AppActor from './AppActor';
import { VueRenderer } from 'tarant-vue';
import IResolver from 'tarant/dist/actor-system/resolver/resolver';
import axios from 'axios';

class RemoteResolverAppActor implements IResolver {
  resolveActorById(id: string): Promise<Actor>{
   return axios.get(`/sync/${id}`)
   .then(result => Object.assign(new AppActor(id),result.data));
  }
} 

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.withMaterializers([new VueRenderer()])
.withResolvers([new RemoteResolverAppActor()])
.done()) 

window.onload = () => {
  system.actorFor("app")
}
