"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeNameToCapitalize = exports.parseName = exports.parseInfoPro = exports.parseInfo = exports.parseInfoFromPath = void 0;
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
const PREFIX_B = 'vona-module-';
const PREFIX_C = './vona-module-';
const PREFIX_D = './';
const PREFIX_E = '/';
// aa-hello aa/hello
//   first check / then -
function parseInfo(moduleName) {
    if (!moduleName)
        return;
    if (moduleName.indexOf('://') > -1)
        return;
    if (moduleName.charAt(0) === '/')
        moduleName = moduleName.substring(1);
    let parts = moduleName.split('/').filter(item => item);
    if (parts.length < 2) {
        parts = moduleName.split('-').filter(item => item);
        if (parts.length < 2)
            return;
        if (parts.length === 4)
            parts = parts.slice(2);
        if (parts.length === 5)
            parts = parts.slice(3);
    }
    const info = {
        pid: parts[0],
        name: parts[1],
        relativeName: `${parts[0]}-${parts[1]}`,
        url: `${parts[0]}/${parts[1]}`,
        originalName: parts.join('-'),
    };
    return info;
}
exports.parseInfo = parseInfo;
function parseInfoPro(moduleName, projectMode, projectEntityType) {
    const info = parseInfo(moduleName);
    if (!info)
        return info;
    if (['zova', 'vona'].includes(projectMode)) {
        info.fullName = `${projectMode}-${projectEntityType}-${info.relativeName}`;
    }
    else {
        info.fullName = `cabloy-${projectEntityType}-${projectMode}-${info.relativeName}`;
    }
    return info;
}
exports.parseInfoPro = parseInfoPro;
// /api/aa/hello/home/index
// vona-module-aa-hello
// ./aa-hello/
// ./vona-module-aa-hello/
function parseName(moduleUrl) {
    if (!moduleUrl)
        return;
    if (moduleUrl.indexOf('/api/static/') === 0) {
        moduleUrl = '/api/' + moduleUrl.substring('/api/static/'.length);
    }
    if (moduleUrl.indexOf(PREFIX_A) === 0) {
        return _parseNameLikeUrl(moduleUrl, PREFIX_A);
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
    else if (moduleUrl.indexOf(PREFIX_E) === 0) {
        return _parseNameLikeUrl(moduleUrl, PREFIX_E);
    }
    else {
        // test-home test/home
        return _parseName(moduleUrl.replace('/', '-'), '');
    }
}
exports.parseName = parseName;
function _parseNameLikeUrl(moduleUrl, prefix) {
    const posA = prefix.length;
    const posB = moduleUrl.indexOf('/', posA) + 1;
    if (posB === 0)
        return;
    let posC = moduleUrl.indexOf('/', posB);
    if (posC === -1)
        posC = moduleUrl.length;
    return moduleUrl.substring(posA, posC).replace('/', '-');
}
function _parseName(moduleUrl, prefix) {
    const posA = prefix.length;
    let posB = moduleUrl.indexOf('/', posA);
    if (posB === -1)
        posB = moduleUrl.indexOf(':', posA);
    if (posB === -1)
        posB = moduleUrl.indexOf('.', posA);
    if (posB === -1)
        posB = moduleUrl.length;
    return moduleUrl.substring(posA, posB);
}
function relativeNameToCapitalize(moduleName, firstCharToUpperCase) {
    return moduleName
        .split('-')
        .map((name, index) => {
        if (index === 0 && !firstCharToUpperCase)
            return name;
        return name.charAt(0).toUpperCase() + name.substring(1);
    })
        .join('');
}
exports.relativeNameToCapitalize = relativeNameToCapitalize;
//# sourceMappingURL=utils.js.map