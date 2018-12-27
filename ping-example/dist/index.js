"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tarant_1 = require("tarant");
class Pinger extends tarant_1.Actor {
    constructor() {
        super();
    }
    ping() {
        console.log('Ping!');
    }
}
const system = tarant_1.ActorSystem.default();
const pinger = system.actorOf(Pinger, []);
pinger.ping();
system.free();
