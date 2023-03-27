import React from "react";
import { Decorator } from "tarant-utils"
import { AppActor } from "../AppActor"

// @ts-ignore
export class ReactDecorator extends Decorator<AppActor> {
    constructor(actor: AppActor) {
        super(actor)
    }

    render() {
        return (<div id="app"><button onClick={(this.actor as any).self.addOne}>{this.actor.counter}</button></div>)
    }

}
