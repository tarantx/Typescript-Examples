import Waterline from 'waterline';
import { IMaterializer, IResolver, Actor, ActorMessage } from 'tarant';
import { IActor } from 'tarant/dist/actor-system/actor';

export default class PersistMaterializer implements IMaterializer, IResolver {
    private actorModel: any;
    private types: any;

    static create(config: any, types: any) : Promise<PersistMaterializer> {
        return new Promise((resolve, rejects) => {
            const actorModel =  Waterline.Collection.extend({
                identity: 'actor',
                datastore: 'default',
                primaryKey: 'id',
                schema: false,
                attributes: {
                  id: { type:'string', required: true },
                  type: {type:'string'}
                }
            });
            const waterline = new Waterline();
            waterline.registerModel(actorModel);
            waterline.initialize(config, (err: any, ontology: any) => {
                if(err)
                    rejects(err)
                else
                    resolve(new PersistMaterializer(ontology.collections.actor, types))
            })
        })
    }


     protected constructor(actorModel : any, types: any ) {
        this.actorModel = actorModel
        this.types = types
    }

    private async createOrUpdate(actor: Actor){
        let record = await (actor as any).toJson()
        
        if(await this.actorModel.findOne({id : record.id }))
            await this.actorModel.updateOne({id : record.id }).set(record);
        else
            await this.actorModel.create(record);
    }

    async onInitialize(actor: Actor): Promise<void> {
        await this.createOrUpdate(actor)
    }
    onBeforeMessage(actor: Actor, message: ActorMessage): void{
        //
    }
    async onAfterMessage(actor: Actor, message: ActorMessage): Promise<void> {
        await this.createOrUpdate(actor)
    }
    onError(actor: Actor, message: ActorMessage, error: any): void{
        //
    }

    async resolveActorById(id: string): Promise<IActor>{
        let result = await this.actorModel.findOne({ id })
        if(!result)
            return Promise.reject("not found")
        const actor = new this.types[result.type](id)
        actor.updateFrom(result)
        return Promise.resolve(actor)

    }
}
