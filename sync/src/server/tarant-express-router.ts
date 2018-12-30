import { Router, Request, Response } from "express"
import { ActorSystem } from 'tarant';



export default function createSyncRouter(system: ActorSystem, config: any) {
    const router : Router = Router()

    router.get(`${config.paths.pull}/:id`, async (req: Request, res: Response) => {
        try {
            const actor = await system.actorFor(req.params.id) as any
            res.json(await actor.toJson())
        } catch (error) {
            res.sendStatus(400)
        }
    })

    router.post(`${config.paths.push}/:id`, async (req: Request, res: Response) => {
        let actor
        try {        
            actor = await system.actorFor(req.params.id) as any
        } catch (error) {
            actor = await system.actorOf(config.ActorTypes[req.body.type],[req.params.id]) as any
        }
        actor.updateFrom(req.body)
        res.sendStatus(200)
    })

    return router
    
}