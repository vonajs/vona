let __onionScenesMeta;
export function getOnionScenesMeta(modules) {
    if (!__onionScenesMeta) {
        __onionScenesMeta = _getOnionScenesMeta(modules);
    }
    return __onionScenesMeta;
}
let __onionMetasMeta;
export function getOnionMetasMeta(modules) {
    if (!__onionMetasMeta) {
        __onionMetasMeta = _getOnionMetasMeta(modules);
    }
    return __onionMetasMeta;
}
export function _getOnionScenesMeta(modules) {
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
export function _getOnionMetasMeta(modules) {
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
