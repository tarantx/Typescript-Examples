import { VueActor, ActorSystem } from "tarant-vue";
import {LocalStoragePersisted} from 'tarant-local-storage'

const ID = "#app"

export default class AppActor extends VueActor {
  constructor() {
      super(ID)
      this.counter = 0
  }

  addOne() {
    this.counter++
  }

  static async instance(system: ActorSystem) {
      try {
          return await system.actorFor(ID)
      } catch (_) {
          return system.actorOf(AppActor, [])
      }
  }

  private counter = 0; 
  readonly template : string = '<button v-on:click="addOne">{{counter}}</button>'
}
LocalStoragePersisted("AppActor", AppActor)