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

export interface ISocketCabloyPerformActionOptions {
  id: number;
  m: 'get' | 'post' | 'delete' | 'put' | 'patch';
  p: string;
  b?: any;
  h?: object;
}

export type TypeSocketPacketCabloy = [keyof ISocketCabloyEventRecord | undefined, any];

declare global {
  interface WebSocket {
    parseEvent(event: MessageEvent): TypeSocketPacketCabloy;
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
