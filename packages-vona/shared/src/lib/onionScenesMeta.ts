import { IModule, OnionScenesMeta } from '@cabloy/module-info';

let __result: OnionScenesMeta;
export function getOnionScenesMeta(modules: Record<string, IModule>) {
  if (!__result) {
    __result = _getOnionScenesMeta(modules);
  }
  return __result;
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
