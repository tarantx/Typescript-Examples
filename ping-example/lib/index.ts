import { Actor, ActorSystem } from 'tarant'

class Pinger extends Actor {
    public constructor() {
        super()
    }
    
    ping(): void {
        console.log('Ping!')
    }
}

const system = ActorSystem.default()
const pinger = system.actorOf(Pinger, [])

pinger.ping()
system.free()