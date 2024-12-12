import { IModule, OnionScenesMeta } from '@cabloy/module-info';

export const onionScenesMeta: OnionScenesMeta = {
  // todo: remove
  atom: {
    sceneIsolate: true,
  },
  middleware: {
    hasLocal: true,
    optionsRoute: true,
    optionsDynamic: true,
    optionsGlobalInterfaceName: 'IDecoratorMiddlewareOptionsGlobal',
  },
  guard: {
    hasLocal: true,
    optionsRoute: true,
    optionsDynamic: true,
    optionsGlobalInterfaceName: 'IDecoratorGuardOptionsGlobal',
  },
  interceptor: {
    hasLocal: true,
    optionsRoute: true,
    optionsDynamic: true,
    optionsGlobalInterfaceName: 'IDecoratorInterceptorOptionsGlobal',
  },
  pipe: {
    hasLocal: true,
    optionsRoute: true,
    optionsArgumentPipe: true,
    optionsDynamic: true,
    optionsGlobalInterfaceName: 'IDecoratorPipeOptionsGlobal',
  },
  filter: {
    hasLocal: true,
    optionsRoute: true,
    optionsDynamic: true,
    optionsGlobalInterfaceName: 'IDecoratorFilterOptionsGlobal',
  },
  socketConnection: {
    optionsGlobalInterfaceName: 'IDecoratorSocketConnectionOptions',
  },
  socketPacket: {
    optionsGlobalInterfaceName: 'IDecoratorSocketPacketOptions',
  },
  aop: {
    optionsGlobalInterfaceName: 'IDecoratorAopOptions',
  },
  entity: {
    sceneIsolate: true,
    optionsGlobalInterfaceName: 'IDecoratorEntityOptions',
  },
  model: {
    sceneIsolate: true,
    optionsGlobalInterfaceName: 'IDecoratorModelOptions',
  },
  controller: {
    sceneIsolate: true,
    optionsGlobalInterfaceName: 'IDecoratorControllerOptions',
  },
  meta: {
    optionsGlobalInterfaceName: '',
  },
  summerCache: {
    optionsGlobalInterfaceName: 'IDecoratorSummerCacheOptions',
  },
  startup: {
    optionsGlobalInterfaceName: 'IDecoratorStartupOptions',
  },
  queue: {
    optionsGlobalInterfaceName: 'IDecoratorQueueOptions',
  },
};

let __result: OnionScenesMeta;
export function getOnionScenesMeta(modules: Record<string, IModule>) {
  if (!__result) {
    __result = _getOnionScenesMeta(modules);
  }
  return __result;
}

export function _getOnionScenesMeta(modules: Record<string, IModule>) {
  let result = Object.assign({}, onionScenesMeta);
  for (const moduleName in modules) {
    const module = modules[moduleName];
    const onions = module.package.vonaModule?.onions;
    if (!onions) continue;
    result = Object.assign(result, onions);
  }
  return result;
}
