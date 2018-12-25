import { VueActor } from "../Models/VueActor";

export default class AppActor extends VueActor {
    constructor() {
      super("#app")
      this.schedule(1000, this.incrementCounter, [])
    }
  
    private incrementCounter(): void {
      this.counter++;
    }

    private counter = 0; 
    readonly template : string = "<div>counter: {{counter}}</div>"
  }