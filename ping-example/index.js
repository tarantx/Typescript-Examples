const { Actor, ActorSystem } = require('tarant')

class Pinger extends Actor {
    ping() {
        console.log('Ping!')
    }
}

const system = ActorSystem.default()
const pinger = system.actorOf(Pinger)

pinger.ping()

setTimeout(e => system.free(), 0)