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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseName = exports.parseInfo = exports.parseInfoFromPath = exports.parseModuleInfo = exports.parseModuleName = exports.ParseModuleNameLevelInit = void 0;
const stack_utils_1 = __importDefault(require("stack-utils"));
__exportStar(require("./interface.js"), exports);
exports.ParseModuleNameLevelInit = 1;
function parseModuleName(level = exports.ParseModuleNameLevelInit) {
    const info = parseModuleInfo(level + 1);
    if (!info)
        return;
    return info.relativeName;
}
exports.parseModuleName = parseModuleName;
function parseModuleInfo(level = exports.ParseModuleNameLevelInit) {
    const stackUtils = new stack_utils_1.default();
    const traces = stackUtils.capture(level);
    const trace = traces[level - 1];
    const fileName = trace.getFileName();
    return parseInfoFromPath(fileName);
}
exports.parseModuleInfo = parseModuleInfo;
function parseInfoFromPath(pathName) {
    if (!pathName)
        return;
    pathName = pathName.replace(/\\/gi, '/');
    const parts = pathName.split('/');
    for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        if (part.indexOf('-') === -1)
            continue;
        const info = parseInfo(part);
        if (!info)
            continue;
        return info;
    }
}
exports.parseInfoFromPath = parseInfoFromPath;
const PREFIX_A = '/api/';
const PREFIX_B = 'cabloy-module-api-';
const PREFIX_C = './cabloy-module-api-';
const PREFIX_D = './';
// aa-hello aa/hello
//   first check / then -
function parseInfo(moduleName, type = 'module') {
    if (!moduleName)
        return;
    if (moduleName.indexOf('://') > -1)
        return;
    if (moduleName.charAt(0) === '/')
        moduleName = moduleName.substr(1);
    let parts = moduleName.split('/').filter(item => item);
    if (parts.length < 2) {
        parts = moduleName.split('-').filter(item => item);
        if (parts.length < 2)
            return;
        if (parts.length >= 5)
            parts = parts.slice(3);
    }
    if (type === 'suite') {
        return {
            pid: parts[0],
            name: parts[1],
            fullName: `cabloy-suite-api-${parts[0]}-${parts[1]}`,
            relativeName: `${parts[0]}-${parts[1]}`,
            url: '',
            originalName: '',
        };
    }
    return {
        pid: parts[0],
        name: parts[1],
        fullName: `cabloy-module-api-${parts[0]}-${parts[1]}`,
        relativeName: `${parts[0]}-${parts[1]}`,
        url: `${parts[0]}/${parts[1]}`,
        sync: parts[2] === 'sync',
        monkey: parts[2] === 'monkey',
        originalName: '',
    };
}
exports.parseInfo = parseInfo;
// /api/aa/hello/home/index
// cabloy-module-api-aa-hello
// ./aa-hello/
// ./cabloy-module-api-aa-hello/
function parseName(moduleUrl) {
    if (!moduleUrl)
        return null;
    if (moduleUrl.indexOf('/api/static/') === 0) {
        moduleUrl = '/api/' + moduleUrl.substring('/api/static/'.length);
    }
    if (moduleUrl.indexOf(PREFIX_A) === 0) {
        const posA = PREFIX_A.length;
        const posB = moduleUrl.indexOf('/', posA) + 1;
        if (posB === -1)
            return null;
        const posC = moduleUrl.indexOf('/', posB);
        if (posC === -1)
            return null;
        return moduleUrl.substring(posA, posC);
    }
    else if (moduleUrl.indexOf(PREFIX_B) === 0) {
        return _parseName(moduleUrl, PREFIX_B);
    }
    else if (moduleUrl.indexOf(PREFIX_C) === 0) {
        return _parseName(moduleUrl, PREFIX_C);
    }
    else if (moduleUrl.indexOf(PREFIX_D) === 0) {
        return _parseName(moduleUrl, PREFIX_D);
    }
    return null;
}
exports.parseName = parseName;
function _parseName(moduleUrl, prefix) {
    const posA = prefix.length;
    let posB = moduleUrl.indexOf('/', posA);
    if (posB === -1)
        posB = moduleUrl.length;
    return moduleUrl.substring(posA, posB);
}
//# sourceMappingURL=index.js.map