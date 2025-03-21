export interface ISocketCabloyEventRecord {}
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
