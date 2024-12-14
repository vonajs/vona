import { createBeanDecorator } from 'vona';
import { IDecoratorSocketPacketOptions } from '../types/socketPacket.js';

export function SocketPacket<T extends IDecoratorSocketPacketOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('socketPacket', options);
}
