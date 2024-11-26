export interface OnionSceneMeta {
  hasLocal?: boolean;
  optionsRoute?: boolean;
  optionsArgumentPipe?: boolean;
  optionsDynamic?: boolean;
  optionsGlobalInterfaceName?: string;
}

export type OnionScenesMeta = Record<string, OnionSceneMeta>;

export const onionScenesMeta: OnionScenesMeta = {
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
  connection: {
    optionsGlobalInterfaceName: 'IDecoratorConnectionOptions',
  },
  packet: {
    optionsGlobalInterfaceName: 'IDecoratorPacketOptions',
  },
};
