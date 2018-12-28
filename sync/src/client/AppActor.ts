import { VueActor } from "tarant-vue";

export default class AppActor extends VueActor {
  constructor(name) {
      super(`#${name}`)
  }

  addOne() {
      this.counter++
  }

  public counter = 1; 
  readonly template : string = '<div id="app"><button v-on:click="addOne">{{counter}}</button></div>'
}