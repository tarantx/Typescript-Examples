import { Actor } from 'tarant';
import { decorate } from '../utils/decorate';
import { Serialization } from './decorators/Serialization';
import { ReactDecorator } from './decorators/ReactDecorator';

export class AppActor extends Actor {

  constructor(name: string) {
      super(name)
  }

  public addOne() : void {
      this.counter++
  }

   public counter = 1; 
}

const DecoratedActor = decorate(AppActor, Serialization, ReactDecorator)

export default DecoratedActor