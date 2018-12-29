import express, { Request, Response } from 'express'
import { ActorSystem, ActorSystemConfigurationBuilder, Actor } from 'tarant';
import AppActor from '../domain/AppActor';
import bodyParser from "body-parser";


const app: express.Application = express()
const port: number = 3002

app.use(express.static('dist'))
app.use(bodyParser.json())

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.done())  

system.actorOf(AppActor, ["app"])

app.get('/pull/:id', async (req: Request, res: Response) => {
    try {
        const actor = await system.actorFor(req.params.id) as any
        res.send(await actor.toJson())
    } catch (error) {
        console.log(error)
    }
})

app.post('/push/:id', async (req: Request, res: Response) => {
    try {
        let actor = await system.actorFor(req.params.id) as any
        actor.updateFrom(req.body)
        res.status(200).send()
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})