import { Actor } from '@wind-js/actor';
export abstract class VueActor extends Actor {
    abstract readonly template: string;
}
