import express from 'express'
import { ActorSystem, ActorSystemConfigurationBuilder } from 'tarant';
import * as diskAdapter from 'sails-disk';
import bodyParser from "body-parser";
import SyncController from "tarant-sync-router-express";
import { PersistResolverMaterializer } from "tarant-db-persist";
import { config } from "../AppConfig"
import AppActor from '../domain';

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
    const persister = await PersistResolverMaterializer.create(dbConfig, { AppActor })

    const app: express.Application = express()
    const port: number = 3000

    const system : any = ActorSystem.for(ActorSystemConfigurationBuilder.define()
        .withMaterializers([persister as any]) 
        .withResolvers([persister as any])
        .done())  

    app.use(express.static('dist'))
    app.use(bodyParser.json())
    app.use(SyncController(system, config))

    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`)
    })
}

startServer().then(console.log).catch(console.error)