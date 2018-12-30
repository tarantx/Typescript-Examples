import { VueActor } from "tarant-vue";
import { IExportable } from "../modules/sync/IExportable";
import { IUpdatable } from "../modules/sync/IUpdatable";

export default class AppActor extends VueActor implements IExportable, IUpdatable {

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
