"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionReady = void 0;
const index_js_1 = require("../../../types/index.js");
const beanSimple_js_1 = require("../../bean/beanSimple.js");
const clear_js_1 = __importDefault(require("./clear.js"));
class VersionReady extends beanSimple_js_1.BeanSimple {
    initialize() {
        const app = this.app;
        // checkAppReady
        app.meta.checkAppReady = async function () {
            return new Promise((resolve, reject) => {
                // check once
                if (app.meta.__versionReady) {
                    resolve(true);
                }
                if (app.meta.__versionReadyError) {
                    reject(app.meta.__versionReadyError);
                }
                // listen
                app.on(index_js_1.EnumAppEvent.AppReady, () => {
                    resolve(true);
                });
                app.on(index_js_1.EnumAppEvent.AppReadyError, err => {
                    reject(err);
                });
            });
        };
    }
    async execute() {
        const app = this.app;
        try {
            // version ready
            await _versionReady(app);
            // record
            app.meta.__versionReady = true;
            // event: appReady
            app.emit(index_js_1.EnumAppEvent.AppReady);
            // event to agent
            app.meta.messenger.callAgent({
                name: 'appReady',
                data: { pid: process.pid },
            });
        }
        catch (err) {
            // record
            app.meta.__versionReadyError = err;
            // event: appReadyError
            app.emit(index_js_1.EnumAppEvent.AppReadyError, err);
            // throw exception
            throw err;
        }
    }
}
exports.VersionReady = VersionReady;
async function _versionReady(app) {
    // clear keys
    await (0, clear_js_1.default)(app);
    // run startups: not after
    for (const startup of app.meta.startupsArray) {
        if (!startup.config.disable && !startup.config.instance && startup.config.after !== true) {
            console.log(`---- startup: ${startup.key}, pid: ${process.pid}`);
            await app.meta._runStartup({ module: startup.module, name: startup.name });
        }
    }
    // appReady
    app.meta.appReady = true;
    app.meta.appReadyInstances = {};
    // run startups: after
    for (const startup of app.meta.startupsArray) {
        if (!startup.config.disable && !startup.config.instance && startup.config.after === true) {
            console.log(`---- startup: ${startup.key}, pid: ${process.pid}`);
            await app.meta._runStartup({ module: startup.module, name: startup.name });
        }
    }
    // version init
    if (app.meta.isTest || app.meta.isLocal) {
        // subdomain
        const subdomain = '';
        // init
        await app.meta.util.executeBean({
            subdomain,
            beanModule: 'a-instance',
            beanFullName: 'instance',
            context: { subdomain },
            fn: 'instanceStartup',
        });
    }
    // version test
    if (app.meta.isTest) {
        // subdomain
        const subdomain = '';
        // test
        await app.meta.util.executeBean({
            subdomain,
            beanModule: 'a-version',
            beanFullName: 'a-version.local.version',
            context: subdomain,
            fn: '__instanceTest',
        });
    }
}
//# sourceMappingURL=ready.js.map