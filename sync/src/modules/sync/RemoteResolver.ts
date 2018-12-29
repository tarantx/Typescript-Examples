import { Actor, ActorMessage } from 'tarant';
import IResolver from 'tarant/dist/actor-system/resolver/resolver';
import axios from 'axios';
import IMaterializer from 'tarant/lib/actor-system/materializer/materializer';
export class RemoteResolver implements IResolver, IMaterializer {
  onInitialize(actor: Actor): void {
    //
  }
  onBeforeMessage(actor: Actor, message: ActorMessage): void {
    //
  }
  async onAfterMessage(actor: Actor, message: ActorMessage): void {
    axios.post(`/push/${actor.id}`, await actor.toJson());
  }
  onError(actor: Actor, message: ActorMessage, error: any): void {
    //
  }
  resolveActorById(id: string): Promise<Actor> {
    return axios.get(`/pull/${id}`)
      .then(result => Object.assign(eval(`new ${result.data.type}("${id}")`), result.data));
  }
}
