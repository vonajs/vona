export interface ISocketCabloyEventRecord {
  default: never;
  performAction: never;
  performActionBack: never;
}

export const socketCabloyEventRecord = {
  default: '_a',
  performAction: '_b',
  performActionBack: '_c',
};
export const socketCabloyEventRecordReverse = {
  _a: 'default',
  _b: 'performAction',
  _c: 'performActionBack',
};

export type TypeSocketCabloyPerformActionMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';
export interface ISocketCabloyPerformActionOptions {
  method: TypeSocketCabloyPerformActionMethod;
  perform: string;
  body?: any;
  headers?: object;
}
export interface ISocketCabloyPerformActionOptionsInner {
  id: number;
  m: TypeSocketCabloyPerformActionMethod;
  p: string;
  b?: any;
  h?: object;
}

export type TypeSocketPacketCabloy = [keyof ISocketCabloyEventRecord | undefined, any];

declare module 'vona-module-a-socket'{

  export interface ISocketNamespaceRecord {
    cabloy: never;
  }
}

declare module 'ws'{
  export interface WebSocket {
    sendEvent(eventName: keyof ISocketCabloyEventRecord, data: any, cb?: (err?: Error) => void): void;
    sendEvent(
      eventName: keyof ISocketCabloyEventRecord,
      data: any,
      options: {
        mask?: boolean | undefined;
        binary?: boolean | undefined;
        compress?: boolean | undefined;
        fin?: boolean | undefined;
      },
      cb?: (err?: Error) => void,
    ): void;
  }
}
