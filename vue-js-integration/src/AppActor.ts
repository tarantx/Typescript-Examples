import { VueActor, ActorSystem } from "tarant-vue";
import {LocalStoragePersisted} from 'tarant-local-storage'

export default class AppActor extends VueActor {
  constructor() {
      super("#app")
      this.counter = 0
  }

  addOne() {
    this.counter++
  }

  static async instance(system: ActorSystem) {
      try {
          return await system.actorFor('#app')
      } catch (_) {
          return system.actorOf(AppActor, [])
      }
  }

  private counter = 0; 
  readonly template : string = '<button v-on:click="addOne">{{counter}}</button>'
}
LocalStoragePersisted("AppActor", AppActor)