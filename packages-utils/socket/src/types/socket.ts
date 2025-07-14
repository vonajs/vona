export interface ISocketCabloyEventRecordSystem {
  sysReady: never;
  sysPerformAction: never;
  sysPerformActionBack: never;
}

export interface ISocketCabloyEventRecord {}

export const socketCabloyEventRecord = {
  sysReady: '_a',
  sysPerformAction: '_b',
  sysPerformActionBack: '_c',
};
export const socketCabloyEventRecordReverse = {
  _a: 'sysReady',
  _b: 'sysPerformAction',
  _c: 'sysPerformActionBack',
};

export type TypeSocketCabloyPerformActionMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';
export interface ISocketCabloyPerformActionOptions {
  query?: object;
  body?: any;
  headers?: object;
}
export interface ISocketCabloyPerformActionOptionsInner {
  i: number;
  m: TypeSocketCabloyPerformActionMethod;
  p: string;
  q?: object;
  b?: any;
  h?: object;
}

export type TypeSocketPacketCabloy<K extends keyof ISocketCabloyEventRecord = never> = [K | undefined, ISocketCabloyEventRecord[K] | any];

export interface ISendEventOptions {
  mask?: boolean | undefined;
  binary?: boolean | undefined;
  compress?: boolean | undefined;
  fin?: boolean | undefined;
}

declare global {
  interface WebSocket {
    onReady(): void;
    onEvent<K extends keyof ISocketCabloyEventRecord>(eventName: K, data: ISocketCabloyEventRecord[K], event: MessageEvent): void;
    onFallback(event: MessageEvent): void;
    parseEvent(event: MessageEvent): TypeSocketPacketCabloy;
    sendEvent<K extends keyof ISocketCabloyEventRecord>(eventName: K, data: ISocketCabloyEventRecord[K] | undefined): void;
    performAction(method: TypeSocketCabloyPerformActionMethod,
      path: string,
      options?: ISocketCabloyPerformActionOptions,
    ): Promise<any>;
    closeEvents(): void;
    handshake(headers?: object): Promise<any>;
  }
}
