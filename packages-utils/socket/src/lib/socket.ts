import type { ISocketCabloyEventRecord, TypeSocketPacketCabloy } from 'vona-module-cabloy-socket';
import { socketCabloyEventRecord, socketCabloyEventRecordReverse } from 'vona-module-cabloy-socket';

WebSocket.prototype.sendEvent = function (eventName: keyof ISocketCabloyEventRecord, data: any) {
  const eventNameInner = socketCabloyEventRecord[eventName] ?? eventName;
  this.send(JSON.stringify([eventNameInner, data]));
};

WebSocket.prototype.parseEvent = function (event: MessageEvent) {
  const data = event.data;
  const packetInner = (data && typeof data === 'string') ? JSON.parse(data) : [undefined, data];
  const eventName = socketCabloyEventRecordReverse[packetInner[0]] ?? packetInner[0];
  const packet: TypeSocketPacketCabloy = [eventName, packetInner[1]];
  return packet;
};
