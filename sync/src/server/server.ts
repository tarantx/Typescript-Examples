import express, { Request, Response } from 'express'
import { ActorSystem, ActorSystemConfigurationBuilder, Actor } from 'tarant';

import bodyParser from "body-parser";
import SyncController from "tarant-sync-router-express";
import { config } from "../AppConfig"


const app: express.Application = express()
const port: number = 3002

const system = ActorSystem.for(ActorSystemConfigurationBuilder.define().done())  

app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(SyncController(system, config))

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`)
})