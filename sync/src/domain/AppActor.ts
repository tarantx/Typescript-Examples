import { Actor } from 'tarant';

class AppActor extends Actor {

  constructor(name: string) {
      super(name)
  }

  public addOne() : void {
      this.counter++
  }

   public counter = 1; 
}

interface Constructor<T extends Actor> {
    new (...args: any[]): T;
}


// current problems are the change of name of the prototype will make it imposible to resolve
function decorate<T extends Actor>(SuperClass: Constructor<T>, ...decorators: any[]): Constructor<T> {
    
    return <Constructor<T>>class extends (<Constructor<Actor>>SuperClass) {
        constructor(params : any) {
            super(params);
            decorators.forEach(decorator => 
                (Object as any)
                    .entries(decorator.prototype)
                    .filter(([name]: [string]) => name !=='constructor')
                    .forEach((...element: any[]) => {
                        const instance = new decorator(this)
                        if(!(this as any).constructor.prototype[element[0][0]])
                            (this as any).constructor.prototype[element[0][0]] = (...parameters: any[]) => instance[element[0][0]](parameters)
                })

            )
          }
    }
}

class decorator<T> {
    protected readonly actor: T;

    constructor(actor: T) {
        this.actor = actor
    }
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
