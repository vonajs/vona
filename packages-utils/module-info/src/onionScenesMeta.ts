import type { IModule, OnionMetasMeta, OnionScenesMeta } from './interface.ts';

let __onionScenesMeta: OnionScenesMeta;
export function getOnionScenesMeta(modules: Record<string, IModule>) {
  if (!__onionScenesMeta) {
    __onionScenesMeta = _getOnionScenesMeta(modules);
  }
  return __onionScenesMeta;
}

let __onionMetasMeta: OnionMetasMeta;
export function getOnionMetasMeta(modules: Record<string, IModule>) {
  if (!__onionMetasMeta) {
    __onionMetasMeta = _getOnionMetasMeta(modules);
  }
  return __onionMetasMeta;
}

export function _getOnionScenesMeta(modules: Record<string, IModule>) {
  const result = {};
  for (const moduleName in modules) {
    const module = modules[moduleName];
    const onions = module.info.onionsMeta?.onions;
    if (!onions) continue;
    for (const sceneName in onions) {
      result[sceneName] = { ...onions[sceneName], module };
    }
  }
  return result;
}

export function _getOnionMetasMeta(modules: Record<string, IModule>) {
  const result = {};
  for (const moduleName in modules) {
    const module = modules[moduleName];
    const metas = module.info.onionsMeta?.metas;
    if (!metas) continue;
    for (const sceneName in metas) {
      result[sceneName] = { ...metas[sceneName], module };
    }
  }
  return result;
}
