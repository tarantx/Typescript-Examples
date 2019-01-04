import express from 'express'
import { ActorSystem, ActorSystemConfigurationBuilder, Actor } from 'tarant';
import * as diskAdapter from 'sails-disk';
import bodyParser from "body-parser";
import SyncController from "tarant-sync-router-express";
import { config } from "../AppConfig"
import PersistMaterializer from './tarant-db';
import AppActor from '../domain/AppActor';

var dbConfig = {
    adapters: {
      'disk': diskAdapter
    },
    datastores: {
        default: {
          adapter: 'disk'
        }
    }
  };


async function startServer() {
    const persister = await PersistMaterializer.create(dbConfig, { AppActor })

    const app: express.Application = express()
    const port: number = 3002

    const system : any = ActorSystem.for(ActorSystemConfigurationBuilder.define()
        .withMaterializers([persister])
        .withResolvers([persister])
        .done())  

    app.use(express.static('dist'))
    app.use(bodyParser.json())
    app.use(SyncController(system, config))

    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`)
    })
}

startServer().then(console.log).catch(console.error)