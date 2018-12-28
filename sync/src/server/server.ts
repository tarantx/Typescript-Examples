import express, { Request, Response } from 'express'
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant';
import AppActor from './AppActor';

const app: express.Application = express()
const port: number = 3002

app.use(express.static('dist'))

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define()
.done())  

system.actorOf(AppActor, ["app"])

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

app.get('/sync/:id', async (req: Request, res: Response) => {
    try {
        const actor = await system.actorFor(req.params.id) as any
        res.send(await actor.toJson())
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})