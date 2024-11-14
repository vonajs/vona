export interface OnionSceneMeta {
  hasLocal?: boolean;
  optionsRoute?: boolean;
  optionsPipe?: boolean;
  optionsDynamic?: boolean;
}

export interface OnionMeta {
  scene: {
    [key: string]: OnionSceneMeta;
  };
}

export const onionMeta: OnionMeta = {
  scene: {
    middleware: {
      hasLocal: true,
      optionsRoute: true,
      optionsDynamic: true,
    },
    guard: {
      hasLocal: true,
      optionsRoute: true,
      optionsDynamic: true,
    },
    interceptor: {
      hasLocal: true,
      optionsRoute: true,
      optionsDynamic: true,
    },
    pipe: {
      hasLocal: true,
      optionsRoute: true,
      optionsPipe: true,
      optionsDynamic: true,
    },
    connection: {},
    packet: {},
  },
};
