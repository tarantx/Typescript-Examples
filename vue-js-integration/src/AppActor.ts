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
      return await system.resolveOrNew(ID, AppActor, [])
  }

  private counter = 0; 
  readonly template : string = '<button v-on:click="addOne">{{counter}}</button>'
}
LocalStoragePersisted("AppActor", AppActor)