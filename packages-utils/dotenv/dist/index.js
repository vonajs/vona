"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvFiles = exports.metaToScope = exports.loadEnvs = void 0;
const egg_born_utils_1 = __importDefault(require("egg-born-utils"));
const cascade_extend_1 = require("cascade-extend");
function loadEnvs(_meta, _dir, _prefix = '.env', _postfix) { }
exports.loadEnvs = loadEnvs;
function metaToScope(meta) {
    const scope = {};
    for (const key in meta) {
        scope[meta[key]] = true;
    }
    return scope;
}
exports.metaToScope = metaToScope;
function getEnvFiles(meta, dir, prefix, postfix) {
    // files
    const pattern = [`${dir}/${prefix}*`];
    const files = egg_born_utils_1.default.tools.globbySync(pattern);
    const fileNames = files.map(item => {
        item = item.substring(dir.length + 1);
        if (postfix) {
            item = item.substring(0, item.length - postfix.length);
        }
        return item;
    });
    // source
    const source = {};
    for (const fileName of fileNames) {
        source[fileName] = true;
    }
    // scope
    const scope = metaToScope(meta);
    const keys = (0, cascade_extend_1.cascadeExtendKeys)(scope, source, prefix, '.');
    return keys;
}
exports.getEnvFiles = getEnvFiles;
//# sourceMappingURL=index.js.map