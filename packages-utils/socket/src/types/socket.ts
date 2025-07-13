export interface ISocketCabloyEventRecord {
  // ready: never;
  // performAction: never;
  // performActionBack: never;
}

export const socketCabloyEventRecord = {
  ready: '_a',
  performAction: '_b',
  performActionBack: '_c',
};
export const socketCabloyEventRecordReverse = {
  _a: 'ready',
  _b: 'performAction',
  _c: 'performActionBack',
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

export type TypeSocketPacketCabloy<K extends keyof ISocketCabloyEventRecord = never> = [K, ISocketCabloyEventRecord[K]] | [undefined, any];

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
