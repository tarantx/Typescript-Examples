"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const tarant_1 = require("tarant");
const diskAdapter = tslib_1.__importStar(require("sails-disk"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const tarant_sync_router_express_1 = tslib_1.__importDefault(require("tarant-sync-router-express"));
const tarant_db_persist_1 = require("tarant-db-persist");
const AppConfig_1 = require("../AppConfig");
const AppActor_1 = tslib_1.__importDefault(require("../domain/AppActor"));
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
function startServer() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const persister = yield tarant_db_persist_1.PersistResolverMaterializer.create(dbConfig, { AppActor: AppActor_1.default });
        const app = express_1.default();
        const port = 3000;
        const system = tarant_1.ActorSystem.for(tarant_1.ActorSystemConfigurationBuilder.define()
            .withMaterializers([persister])
            .withResolvers([persister])
            .done());
        app.use(express_1.default.static('dist'));
        app.use(body_parser_1.default.json());
        app.use(tarant_sync_router_express_1.default(system, AppConfig_1.config));
        app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}/`);
        });
    });
}
startServer().then(console.log).catch(console.error);
