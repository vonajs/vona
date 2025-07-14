import type { ISocketCabloyEventRecord, ISocketCabloyEventRecordSystem, ISocketCabloyPerformActionOptions, ISocketCabloyPerformActionOptionsInner, TypeSocketCabloyPerformActionMethod, TypeSocketPacketCabloy } from '../types/socket.ts';
import { socketCabloyEventRecord, socketCabloyEventRecordReverse } from '../types/socket.ts';

const SymbolPerformActionId = Symbol('SymbolPerformActionId');
const SymbolPerformActionRecord = Symbol('SymbolPerformActionRecord');

const __cabloyEventPrefix = '_:';

WebSocket.prototype.sendEvent = function (eventName: keyof ISocketCabloyEventRecord, data: any) {
  const eventNameInner = socketCabloyEventRecord[eventName] ?? eventName;
  this.send(__cabloyEventPrefix + JSON.stringify([eventNameInner, data]));
};

WebSocket.prototype.parseEvent = function (event: MessageEvent) {
  const data = event.data;
  let packet: TypeSocketPacketCabloy;
  if (typeof data === 'string' && data.startsWith(__cabloyEventPrefix)) {
    const packetInner = JSON.parse(data.substring(__cabloyEventPrefix.length));
    const eventName = socketCabloyEventRecordReverse[packetInner[0]] ?? packetInner[0];
    packet = [eventName, packetInner[1]];
  } else {
    packet = [undefined, data];
  }
  const eventName: keyof ISocketCabloyEventRecord | undefined = packet[0];
  const result = packet[1] as any;
  if (eventName === ('sysReady' satisfies keyof ISocketCabloyEventRecordSystem)) {
    this.onReady();
  } else if (eventName === ('sysPerformActionBack' satisfies keyof ISocketCabloyEventRecordSystem)) {
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
  } else if (eventName !== undefined) {
    this.onEvent(eventName, result as never, event);
  } else {
    this.onFallback(event);
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
    this.sendEvent('sysPerformAction' satisfies keyof ISocketCabloyEventRecordSystem as never, data as never);
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
