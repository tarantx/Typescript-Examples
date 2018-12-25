import { VueActor } from "../Models/VueActor";

export default class AppActor extends VueActor {
    constructor() {
      super("#app")
      setInterval(() => {
        ++this.counter;
        this.message = "counter: " + this.counter
      } , 1000)
    }
  
    private counter = 0; 
  
    readonly template : string = "<div>{{message}}</div>"
    public message : string = ""
  
  }