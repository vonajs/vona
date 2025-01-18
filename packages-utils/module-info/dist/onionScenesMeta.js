"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getOnionMetasMeta = exports._getOnionScenesMeta = exports.getOnionMetasMeta = exports.getOnionScenesMeta = void 0;
let __onionScenesMeta;
function getOnionScenesMeta(modules) {
    if (!__onionScenesMeta) {
        __onionScenesMeta = _getOnionScenesMeta(modules);
    }
    return __onionScenesMeta;
}
exports.getOnionScenesMeta = getOnionScenesMeta;
let __onionMetasMeta;
function getOnionMetasMeta(modules) {
    if (!__onionMetasMeta) {
        __onionMetasMeta = _getOnionMetasMeta(modules);
    }
    return __onionMetasMeta;
}
exports.getOnionMetasMeta = getOnionMetasMeta;
function _getOnionScenesMeta(modules) {
    const result = {};
    for (const moduleName in modules) {
        const module = modules[moduleName];
        const onions = module.info.onionsMeta?.onions;
        if (!onions)
            continue;
        for (const sceneName in onions) {
            result[sceneName] = { ...onions[sceneName], module };
        }
    }
    return result;
}
exports._getOnionScenesMeta = _getOnionScenesMeta;
function _getOnionMetasMeta(modules) {
    const result = {};
    for (const moduleName in modules) {
        const module = modules[moduleName];
        const metas = module.info.onionsMeta?.metas;
        if (!metas)
            continue;
        for (const sceneName in metas) {
            result[sceneName] = { ...metas[sceneName], module };
        }
    }
    return result;
}
exports._getOnionMetasMeta = _getOnionMetasMeta;
//# sourceMappingURL=onionScenesMeta.js.map