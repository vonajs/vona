export interface ISocketEventRecordSystem {
  sysReady: never;
  sysPerformAction: never;
  sysPerformActionBack: never;
}

export interface ISocketEventRecord {}

export const socketEventRecord = {
  sysReady: '_a',
  sysPerformAction: '_b',
  sysPerformActionBack: '_c',
};
export const socketEventRecordReverse = {
  _a: 'sysReady',
  _b: 'sysPerformAction',
  _c: 'sysPerformActionBack',
};

export type TypeSocketEventPerformActionMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';
export interface ISocketEventPerformActionOptions {
  query?: object;
  body?: any;
  headers?: object;
}
export interface ISocketEventPerformActionOptionsInner {
  i: number;
  m: TypeSocketEventPerformActionMethod;
  p: string;
  q?: object;
  b?: any;
  h?: object;
}

export type TypeSocketPacketEvent<K extends keyof ISocketEventRecord = never> = [K | undefined, ISocketEventRecord[K] | any];

export interface ISendEventOptions {
  mask?: boolean | undefined;
  binary?: boolean | undefined;
  compress?: boolean | undefined;
  fin?: boolean | undefined;
}

declare global {
  interface WebSocket {
    onReady(): void;
    onEvent<K extends keyof ISocketEventRecord>(eventName: K, data: ISocketEventRecord[K], event: MessageEvent): void;
    onFallback(event: MessageEvent): void;
    parseEvent(event: MessageEvent): TypeSocketPacketEvent;
    sendEvent<K extends keyof ISocketEventRecord>(eventName: K, data: ISocketEventRecord[K] | undefined): void;
    performAction(method: TypeSocketEventPerformActionMethod,
      path: string,
      options?: ISocketEventPerformActionOptions,
    ): Promise<any>;
    closeEvents(): void;
  }
}
