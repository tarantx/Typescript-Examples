import * as diskAdapter from 'sails-disk';
import Waterline, { Config } from "waterline";
import { IMaterializer, IResolver, Actor, ActorMessage } from 'tarant';
import { IActor } from 'tarant/dist/actor-system/actor';

var config : Config = {
    adapters: {
      'disk': diskAdapter
    },
    connections: {
        default: {
            adapter: 'memory'
        }
    }
  };
type ActorModel = { identity: string; primaryKey: string; schema: boolean; attributes: { id: string; type: string; }; }

export default class PersistMaterializer implements IMaterializer, IResolver {
    private waterline: Waterline.Waterline;
    actorModel: ActorModel;
    

    constructor() {
        this.actorModel = {
            identity: 'Actor',
            primaryKey: 'id',
            schema: false,
            attributes: {
              id: 'string',
              type: 'string'
            }
        };
        this.waterline = new Waterline();
        this.waterline.loadCollection(Waterline.Collection.extend(ActorModel));
        this.waterline.initialize(config, console.log)
    }


    onInitialize(actor: Actor): void{
        //
    }
    onBeforeMessage(actor: Actor, message: ActorMessage): void{
        //
    }
    onAfterMessage(actor: Actor, message: ActorMessage): void{
        throw "not Implemented";
        this.waterline.
    }
    onError(actor: Actor, message: ActorMessage, error: any): void{
        //
    }

    resolveActorById(id: string): Promise<IActor>{
        throw "not Implemented";
    }
}
