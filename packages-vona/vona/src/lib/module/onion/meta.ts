export interface OnionSceneMeta {
  hasLocal?: boolean;
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
    },
    guard: {
      hasLocal: true,
    },
    interceptor: {
      hasLocal: true,
    },
    pipe: {
      hasLocal: true,
    },
    connection: {
      hasLocal: false,
    },
    packet: {
      hasLocal: false,
    },
  },
};
