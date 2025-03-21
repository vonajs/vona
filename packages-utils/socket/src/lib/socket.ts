import type { ISocketCabloyEventRecord, ISocketCabloyPerformActionOptions, ISocketCabloyPerformActionOptionsInner, TypeSocketCabloyPerformActionMethod, TypeSocketPacketCabloy } from '../types/socket.ts';
import { socketCabloyEventRecord, socketCabloyEventRecordReverse } from '../types/socket.ts';

const SymbolPerformActionId = Symbol('SymbolPerformActionId');
const SymbolPerformActionRecord = Symbol('SymbolPerformActionRecord');

WebSocket.prototype.sendEvent = function (eventName: keyof ISocketCabloyEventRecord, data: any) {
  const eventNameInner = socketCabloyEventRecord[eventName] ?? eventName;
  this.send(JSON.stringify([eventNameInner, data]));
};

WebSocket.prototype.parseEvent = function (event: MessageEvent) {
  const data = event.data;
  const packetInner = (data && typeof data === 'string') ? JSON.parse(data) : [undefined, data];
  const eventName = socketCabloyEventRecordReverse[packetInner[0]] ?? packetInner[0];
  const packet: TypeSocketPacketCabloy = [eventName, packetInner[1]];
  if (packet[0] === 'performActionBack') {
    const result = packet[1];
    const performActionBack = this[SymbolPerformActionRecord][result.id];
    if (performActionBack) {
      if (result.code === 0) {
        performActionBack.resolve(result.data);
      } else {
        const err = new Error();
        (err as any).code = result.code;
        err.message = result.message;
        performActionBack.reject(err);
      }
      delete this[SymbolPerformActionRecord][result.id];
    }
  }
  return packet;
};

WebSocket.prototype.performAction = function (
  method: TypeSocketCabloyPerformActionMethod,
  path: string,
  options?: ISocketCabloyPerformActionOptions,
): Promise<any> {
  const id = (this[SymbolPerformActionId] ?? 0) + 1;
  this[SymbolPerformActionId] = id;
  return new Promise((resolve, reject) => {
    if (!this[SymbolPerformActionRecord]) this[SymbolPerformActionRecord] = {};
    this[SymbolPerformActionRecord][id] = { resolve, reject };
    const data: ISocketCabloyPerformActionOptionsInner = {
      id,
      m: method,
      p: path,
      b: options?.body,
      h: options?.headers,
    };
    this.sendEvent('performAction', data);
  });
};
