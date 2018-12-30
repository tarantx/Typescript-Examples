import { VueActor } from "tarant-vue";
import { IUpdatable } from "tarant-sync-client"
import { IExportable } from "tarant-sync-client"

export default class AppActor extends VueActor implements IUpdatable, IExportable {

  constructor(name: string) {
      super(name)
  }

  addOne() {
      this.counter++
  }

  toJson(){
        return {
            type:"AppActor",
            counter: this.counter
        }
    }

    updateFrom({ counter }: any): void {
        this.counter = counter
    }

    private counter = 1; 
    readonly template : string = '<div id="app"><button v-on:click="addOne">{{counter}}</button></div>'
}
