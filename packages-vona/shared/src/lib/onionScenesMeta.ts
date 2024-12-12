export interface OnionSceneMeta {
  sceneIsolate?: boolean;
  hasLocal?: boolean;
  optionsRoute?: boolean;
  optionsArgumentPipe?: boolean;
  optionsDynamic?: boolean;
  optionsGlobalInterfaceName?: string;
}

export type OnionScenesMeta = Record<string, OnionSceneMeta>;

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
  schedule: {
    optionsGlobalInterfaceName: 'IDecoratorScheduleOptions',
  },
};
