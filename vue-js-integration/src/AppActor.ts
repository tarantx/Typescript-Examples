import { VueActor } from "tarant-vue";

export default class AppActor extends VueActor {
  constructor() {
      super("#app")

      this.template = '<button v-on:click="addOne">{{counter}}</button>'
      this.counter = 0
  }

  addOne() {
      this.counter++
  }

  private counter = 0; 
  readonly template : string = "<div>counter: {{counter}}</div>"
}