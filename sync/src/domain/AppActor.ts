import { VueActor } from "tarant-vue";
import { IExportable } from "tarant-remote-sync/dist/IExportable";
import { IUpdatable } from "tarant-remote-sync/dist/IUpdatable";

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
