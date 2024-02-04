"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAgentWorkerLoader = exports.CustomAppWorkerLoader = void 0;
const path_1 = __importDefault(require("path"));
const egg_1 = require("egg");
function createLoaderClass(Base) {
    return class LoaderClass extends Base {
        constructor() {
            super(...arguments);
            this.pkgCabloy = null;
        }
        loadConfig() {
            super.loadConfig();
            this.app.subdomainOffset = typeof this.config.subdomainOffset === 'undefined' ? 2 : this.config.subdomainOffset;
        }
        getAppname() {
            if (!this.pkgCabloy) {
                this.pkgCabloy = require(path_1.default.join(process.cwd(), 'package.json'));
                this.pkg.name = this.pkgCabloy.name;
            }
            return this.pkgCabloy.name;
        }
    };
}
exports.CustomAppWorkerLoader = createLoaderClass(egg_1.AppWorkerLoader);
exports.CustomAgentWorkerLoader = createLoaderClass(egg_1.AgentWorkerLoader);
//# sourceMappingURL=loader.js.map