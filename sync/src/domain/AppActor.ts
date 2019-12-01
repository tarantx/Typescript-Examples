import { Actor } from 'tarant';
interface Constructor<T extends Actor> {
    new (...args: any[]): T;
}

// current problems are the change of name of the prototype will make it imposible to resolve
function decorate<T extends Actor>(SuperClass: Constructor<T>, ...decorators: any[]): Constructor<T> {
    
    return <Constructor<T>>class extends (<Constructor<Actor>>SuperClass) {
        constructor(params : any) {
            super(params);
            decorators.forEach(decorator => {
                const instance = new decorator(this)
                let allNames: string[] = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter((name: string) => name !=='constructor')
                allNames.forEach((name: string) =>{
                    if(!(this as any).constructor.prototype[name])
                        (this as any).constructor.prototype[name] = (...parameters: any[]) => instance[name](...parameters)
                })
            })
          }
    }
}

class decorator<T extends Actor> {
    protected readonly actor: T;

    constructor(actor: T) {
        this.actor = actor
    }
}

class AppActor extends Actor {

  constructor(name: string) {
      super(name)
  }

  public addOne() : void {
      this.counter++
  }

   public counter = 1; 
}

class VueDecorated extends decorator<AppActor> {
    constructor(actor: AppActor) {
        super(actor)
    }

    increment() {
        (this.actor as any).self.addOne()
    }

    template() { return '<div id="app"><button v-on:click="increment">{{this.actor.counter}}</button></div>' }

    data() { 
        return this
    }
}

class Serialization extends decorator<AppActor> {
    constructor(actor: AppActor) {
        super(actor)
    }

    toJson() {
        return {
            id: this.actor.id,
            type: "AppActor",
            counter: this.actor.counter
        }
    }

    updateFrom({ counter }: any): void {
        this.actor.counter = counter
    }
}





const DecoratedActor = decorate(AppActor, VueDecorated, Serialization)
export default DecoratedActor
