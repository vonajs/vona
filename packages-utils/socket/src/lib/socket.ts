export interface ISocketCabloyEventRecord {
  default: never;
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

WebSocket.prototype.sendEvent = function (eventName: keyof ISocketCabloyEventRecord, data: any) {
  const packet: TypeSocketPacketCabloy = [eventName, data];
  this.send(JSON.stringify(packet));
};

WebSocket.prototype.parseEvent = function (event: MessageEvent) {
  const data = event.data;
  const packet: TypeSocketPacketCabloy = (data && typeof data === 'string') ? JSON.parse(data) : [undefined, data];
  return packet;
};
