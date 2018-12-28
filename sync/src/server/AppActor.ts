import { Actor } from "tarant";

export default class AppActor extends Actor {
  constructor(name: string) {
      super(name)
  }

  addOne() {
      this.counter++
  }

  public counter: number = 10; 

  toJson(){
      return {
            type:"AppActor",
            counter: this.counter
      }
  }

}