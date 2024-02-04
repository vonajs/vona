"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMeta = void 0;
const uuid = __importStar(require("uuid"));
const mockUtil_js_1 = require("../utils/mockUtil.js");
const reload_js_1 = require("../module/reload.js");
const util_js_1 = require("../utils/util.js");
const beanSimple_js_1 = require("../bean/beanSimple.js");
const resource_js_1 = require("./resource.js");
const metadata_js_1 = require("./metadata.js");
class AppMeta extends beanSimple_js_1.BeanSimple {
    __init__() {
        // workerId
        this.workerId = uuid.v4();
        // app or agent
        this.inApp = this.app.type === 'application';
        this.inAgent = this.app.type === 'agent';
        // env
        this.prepareEnv();
        // util
        this.util = this.app.bean._newBean(util_js_1.AppUtil);
        // mockUtil
        this.mockUtil = this.app.bean._newBean(mockUtil_js_1.AppMockUtil);
        // reload
        this.reload = this.app.bean._newBean(reload_js_1.AppReload);
        // resource
        this.resource = resource_js_1.appResource;
        this.resource.app = this.app;
        // metadata
        this.metadata = metadata_js_1.appMetadata;
    }
    prepareEnv() {
        // isProd
        this.isProd =
            this.app.config.env !== 'local' && this.app.config.env !== 'unittest' && this.app.config.env !== 'test';
        // isTest
        this.isTest = this.app.config.env === 'unittest' || this.app.config.env === 'test';
        // isLocal
        this.isLocal = this.app.config.env === 'local';
    }
}
exports.AppMeta = AppMeta;
//# sourceMappingURL=meta.js.map