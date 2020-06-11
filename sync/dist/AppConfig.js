"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AppActor_1 = tslib_1.__importDefault(require("./domain/AppActor"));
const config = {
    sync: {
        active: true,
        delay: 1000
    },
    paths: {
        pull: "/pull",
        push: "/push",
    },
    actorTypes: { AppActor: AppActor_1.default }
};
exports.config = config;
