"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tarant_1 = require("tarant");
class Decorator {
    constructor(actor) {
        this.actor = actor;
    }
}
function decorate(SuperClass, ...decorators) {
    return class extends SuperClass {
        constructor(params) {
            super(params);
            decorators.forEach(decorator => {
                const instance = new decorator(this);
                let allNames = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter((name) => name !== 'constructor');
                allNames.forEach((name) => {
                    if (!this.constructor.prototype[name])
                        this.constructor.prototype[name] = (...parameters) => instance[name](...parameters);
                });
            });
        }
    };
}
class AppActor extends tarant_1.Actor {
    constructor(name) {
        super(name);
        this.counter = 1;
    }
    addOne() {
        this.counter++;
    }
}
class VueDecorated extends Decorator {
    constructor(actor) {
        super(actor);
    }
    increment() {
        this.actor.self.addOne();
    }
    template() { return '<div id="app"><button v-on:click="increment">{{this.actor.counter}}</button></div>'; }
    data() {
        return this;
    }
}
class Serialization extends Decorator {
    constructor(actor) {
        super(actor);
    }
    toJson() {
        return {
            id: this.actor.id,
            type: "AppActor",
            counter: this.actor.counter
        };
    }
    updateFrom({ counter }) {
        this.actor.counter = counter;
    }
}
const DecoratedActor = decorate(AppActor, Serialization, VueDecorated);
exports.default = DecoratedActor;
