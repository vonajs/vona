import { IModule, OnionScenesMeta } from '@cabloy/module-info';

let __onionScenesMeta: OnionScenesMeta;
export function getOnionScenesMeta(modules: Record<string, IModule>) {
  if (!__onionScenesMeta) {
    __onionScenesMeta = _getOnionScenesMeta(modules);
  }
  return __onionScenesMeta;
}

export function _getOnionScenesMeta(modules: Record<string, IModule>) {
  const result = {};
  for (const moduleName in modules) {
    const module = modules[moduleName];
    const onions = module.package.vonaModule?.onions;
    if (!onions) continue;
    for (const sceneName in onions) {
      result[sceneName] = { ...onions[sceneName], module };
    }
  }
  return result;
}
