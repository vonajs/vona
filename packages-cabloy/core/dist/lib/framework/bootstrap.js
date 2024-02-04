"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const index_js_1 = require("../module/bean/index.js");
const loader_js_1 = require("../module/loader.js");
const socketio_js_1 = require("../module/socketio.js");
const ready_js_1 = require("../module/version/ready.js");
class Bootstrap {
    constructor(app) {
        this.app = app;
    }
    async loadModules() {
        // bean container
        (0, index_js_1.loadBeanContainer)(this.app);
        // module loader
        const moduleLoader = this.app.bean._newBean(loader_js_1.ModuleLoader);
        await moduleLoader.execute();
    }
    async versionReady() {
        const versionReady = this.app.bean._newBean(ready_js_1.VersionReady);
        await versionReady.execute();
    }
    async socketioReady() {
        const socketioReady = this.app.bean._newBean(socketio_js_1.SocketioReady);
        socketioReady.initialize();
    }
}
exports.Bootstrap = Bootstrap;
//# sourceMappingURL=bootstrap.js.map