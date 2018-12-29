import { Actor, ActorMessage } from 'tarant';
import IResolver from 'tarant/dist/actor-system/resolver/resolver';
import axios from 'axios';
import IMaterializer from 'tarant/dist/actor-system/materializer/materializer';
import { IActor } from 'tarant/dist/actor-system/actor';
export class RemoteResolver implements IResolver, IMaterializer {
  
  private resolvedActors : Actor[] = []

  constructor() {
    setInterval(() => this.updateFromBackend(), 1000)
  }

  private async updateFromBackend(){
    this.resolvedActors.forEach(async actor => {
      const result = await axios.get(`/pull/${actor.id}`)
      actor.updateFrom(result.data)
    })
  }

  onInitialize(actor: Actor): void {
    //
  }
  onBeforeMessage(actor: Actor, message: ActorMessage): void {
    //
  }
  async onAfterMessage(actor: Actor, message: ActorMessage): Promise<void> {
    axios.post(`/push/${actor.id}`, await actor.toJson());
  }
  onError(actor: Actor, message: ActorMessage, error: any): void {
    //
  }
  async resolveActorById(id: string): Promise<Actor> {
    const actor = await axios.get(`/pull/${id}`)
      .then(result => Object.assign(eval(`new ${result.data.type}("${id}")`), result.data))
    this.resolvedActors.push(actor)
    return Promise.resolve(actor)
  }
}
