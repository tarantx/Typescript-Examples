import React from "react";
import { decorator } from "../../utils/decorator"
import { AppActor } from "../AppActor"

export class ReactDecorator extends decorator<AppActor> {
    constructor(actor: AppActor) {
        super(actor)
    }

    render() {
        return (<div id="app"><button onClick={(this.actor as any).self.addOne}>{this.actor.counter}</button></div>)
    }

}
