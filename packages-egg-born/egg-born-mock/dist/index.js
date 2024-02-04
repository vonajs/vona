"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockInfo = exports.mockUrl = exports.mm = exports.mock = exports.app = exports.assert = void 0;
const bootstrap_js_1 = __importDefault(require("egg-mock/bootstrap.js"));
const core_1 = require("@cabloy/core");
const assert_1 = __importDefault(require("assert"));
const module_info_1 = require("@cabloy/module-info");
const ParseModuleNameLevel = module_info_1.ParseModuleNameLevelInit + 2;
if (global.__egg_born_mock === undefined) {
    global.__egg_born_mock = true;
    before(async function () {
        const app = (0, core_1.Cast)(bootstrap_js_1.default.app);
        // wait ready
        await bootstrap_js_1.default.app.ready();
        // session
        bootstrap_js_1.default.app.mockSession({});
        // wait app ready
        await app.meta.checkAppReady();
        // restore
        bootstrap_js_1.default.mock.restore();
    });
    after(async function () {
        await bootstrap_js_1.default.app.close();
    });
}
exports.assert = assert_1.default;
exports.app = (0, core_1.Cast)(bootstrap_js_1.default.app);
exports.mock = bootstrap_js_1.default.mock;
exports.mm = bootstrap_js_1.default.mock;
function mockUrl(url, apiPrefix = true) {
    const moduleInfo = (0, module_info_1.parseModuleInfo)(ParseModuleNameLevel);
    return exports.app.meta.mockUtil.mockUrl(moduleInfo, url, apiPrefix);
}
exports.mockUrl = mockUrl;
function mockInfo() {
    return (0, module_info_1.parseModuleInfo)(ParseModuleNameLevel);
}
exports.mockInfo = mockInfo;
//# sourceMappingURL=index.js.map