import { Actor } from 'tarant';


export class decorator<T extends Actor> {
    protected readonly actor: T;

    constructor(actor: T) {
        this.actor = actor;
    }
}
