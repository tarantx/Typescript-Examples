import { Decorator } from "tarant-utils";
import { AppActor } from '../AppActor';

export class Serialization extends Decorator<AppActor> {
    constructor(actor: AppActor) {
        super(actor);
    }

    toJson() {
        return {
            id: this.actor.id,
            type: "AppActor",
            counter: this.actor.counter
        };
    }

    updateFrom({ counter }: any): void {
        this.actor.counter = counter;
    }
}
