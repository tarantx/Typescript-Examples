import Vue from 'vue';
import { IMaterializer, ActorMessage } from '@wind-js/actor';
import { VueActor } from './VueActor';

export class VueRenderer implements IMaterializer {
    onInitialize(actor: VueActor): void {
      new Vue({
        template: actor.template,
        el: actor.id,
        data: actor
      });
    }
    onBeforeMessage(actor: VueActor, message: ActorMessage): void {
    }
    onAfterMessage(actor: VueActor, message: ActorMessage): void {
    }
    onError(actor: VueActor, message: ActorMessage, error: any): void {
    }
  }