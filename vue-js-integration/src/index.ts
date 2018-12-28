
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant'
import AppActor from './AppActor';
import {LocalStorageRepository} from 'tarant-local-storage'
import { VueRenderer } from 'tarant-vue';

window.onload = () => {
  const repository = new LocalStorageRepository()
  const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
  .withMaterializers([new VueRenderer(), repository])
  .withResolvers([repository])
  .done())  

  AppActor.instance(system)
}
