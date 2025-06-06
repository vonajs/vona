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
    const id = result.i;
    const performActionBack = this[SymbolPerformActionRecord][id];
    delete this[SymbolPerformActionRecord][id];
    if (performActionBack) {
      if (result.c === 0) {
        performActionBack.resolve(result.d);
      } else {
        const err = new Error();
        (err as any).code = result.c;
        err.message = result.m;
        performActionBack.reject(err);
      }
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
      i: id,
      m: method,
      p: path,
      q: options?.query,
      b: options?.body,
      h: options?.headers,
    };
    this.sendEvent('performAction', data);
  });
};

WebSocket.prototype.closeEvents = function () {
  const callbacks = this[SymbolPerformActionRecord];
  if (!callbacks) return;
  for (const id in callbacks) {
    const callback = callbacks[id];
    delete callbacks[id];
    const err = new Error();
    (err as any).code = 400;
    callback.reject(err);
  }
};

WebSocket.prototype.handshake = async function (headers?: object): Promise<any> {
  return await this.performAction('post', 'handshake', { headers });
};
