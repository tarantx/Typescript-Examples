import express, { Request, Response } from 'express'
import { ActorSystem, ActorSystemConfigurationBuilder, Actor } from 'tarant';

import bodyParser from "body-parser";
import AppActor from './AppActor';
import { IUpdatable } from '../modules/sync/IUpdatable';


const app: express.Application = express()
const port: number = 3002

app.use(express.static('dist'))
app.use(bodyParser.json())

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.done())  

app.get('/pull/:id', async (req: Request, res: Response) => {
    try {
        const actor = await system.actorFor(req.params.id) as any
        res.json(await actor.toJson())
    } catch (error) {
        res.sendStatus(400)
    }
})
const map: any = {
    AppActor
}
app.post('/push/:id', async (req: Request, res: Response) => {
    let actor: IUpdatable
    try {        
        actor = await system.actorFor(req.params.id) as any
    } catch (error) {
        actor = await system.actorOf(map[req.body.type],[req.params.id]) as any
    }
    actor.updateFrom(req.body)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})