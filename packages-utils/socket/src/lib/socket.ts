import type { ISocketEventPerformActionItem, ISocketEventPerformActionOptions, ISocketEventPerformActionOptionsInner, ISocketEventRecord, ISocketEventRecordSystem, TypeSocketEventPerformActionMethod, TypeSocketPacketEvent } from '../types/socket.ts';
import { socketEventRecord, socketEventRecordReverse } from '../types/socket.ts';

const SymbolPerformActionId = Symbol('SymbolPerformActionId');
const SymbolPerformActionRecord = Symbol('SymbolPerformActionRecord');

const __cabloyEventPrefix = '_:';

export class WebSocketClient extends WebSocket {
  private [SymbolPerformActionRecord]: Record<string, ISocketEventPerformActionItem | undefined> = {};

  constructor(url: string | URL, protocols?: string | string[] | undefined) {
    super(url, protocols);
    const onMessage = (event: MessageEvent) => {
      this._parseEvent(event);
    };
    const onClose = (_event: CloseEvent) => {
      this._closeEvents();
      this.removeEventListener('message', onMessage);
      this.removeEventListener('close', onClose);
    };
    this.addEventListener('message', onMessage);
    this.addEventListener('close', onClose);
  }

  public sendEvent(eventName: keyof ISocketEventRecord, data: any) {
    const eventNameInner = socketEventRecord[eventName] ?? eventName;
    this.send(__cabloyEventPrefix + JSON.stringify([eventNameInner, data]));
  }

  private _parseEvent(event: MessageEvent) {
    const data = event.data;
    let packet: TypeSocketPacketEvent;
    if (typeof data === 'string' && data.startsWith(__cabloyEventPrefix)) {
      const packetInner = JSON.parse(data.substring(__cabloyEventPrefix.length));
      const eventName = socketEventRecordReverse[packetInner[0]] ?? packetInner[0];
      packet = [eventName, packetInner[1]];
    } else {
      packet = [undefined, data];
    }
    const eventName: keyof ISocketEventRecord | undefined = packet[0];
    const result = packet[1] as any;
    if (eventName === ('sysReady' satisfies keyof ISocketEventRecordSystem)) {
      this.onReady?.();
    } else if (eventName === ('sysPerformActionBack' satisfies keyof ISocketEventRecordSystem)) {
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
      this.onEvent?.(eventName, result as never, event);
    } else {
      this.onFallback?.(event);
    }
    return packet;
  }

  public performAction(
    method: TypeSocketEventPerformActionMethod,
    path: string,
    options?: ISocketEventPerformActionOptions,
  ): Promise<any> {
    const id = (this[SymbolPerformActionId] ?? 0) + 1;
    this[SymbolPerformActionId] = id;
    return new Promise((resolve, reject) => {
      this[SymbolPerformActionRecord][id] = { resolve, reject };
      const data: ISocketEventPerformActionOptionsInner = {
        i: id,
        m: method,
        p: path,
        q: options?.query,
        b: options?.body,
        h: options?.headers,
      };
      this.sendEvent('sysPerformAction' satisfies keyof ISocketEventRecordSystem as never, data as never);
    });
  }

  private _closeEvents() {
    const callbacks = this[SymbolPerformActionRecord];
    this[SymbolPerformActionRecord] = {};
    for (const id in callbacks) {
      const callback = callbacks[id]!;
      const err = new Error();
      (err as any).code = 400;
      callback.reject(err);
    }
  }
}
