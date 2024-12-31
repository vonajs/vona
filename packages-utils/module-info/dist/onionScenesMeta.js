"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnionScenesMeta = getOnionScenesMeta;
exports.getOnionMetasMeta = getOnionMetasMeta;
exports._getOnionScenesMeta = _getOnionScenesMeta;
exports._getOnionMetasMeta = _getOnionMetasMeta;
let __onionScenesMeta;
function getOnionScenesMeta(modules) {
    if (!__onionScenesMeta) {
        __onionScenesMeta = _getOnionScenesMeta(modules);
    }
    return __onionScenesMeta;
}
let __onionMetasMeta;
function getOnionMetasMeta(modules) {
    if (!__onionMetasMeta) {
        __onionMetasMeta = _getOnionMetasMeta(modules);
    }
    return __onionMetasMeta;
}
function _getOnionScenesMeta(modules) {
    const result = {};
    for (const moduleName in modules) {
        const module = modules[moduleName];
        const onions = module.package.vonaModule?.onions ?? module.package.zovaModule?.onions;
        if (!onions)
            continue;
        for (const sceneName in onions) {
            result[sceneName] = { ...onions[sceneName], module };
        }
    }
    return result;
}
function _getOnionMetasMeta(modules) {
    const result = {};
    for (const moduleName in modules) {
        const module = modules[moduleName];
        const metas = module.package.vonaModule?.metas ?? module.package.zovaModule?.metas;
        if (!metas)
            continue;
        for (const sceneName in metas) {
            result[sceneName] = { ...metas[sceneName], module };
        }
    }
    return result;
}
//# sourceMappingURL=onionScenesMeta.js.map