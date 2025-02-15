import type { IDecoratorSocketPacketOptions } from '../types/socketPacket.js';
import { createBeanDecorator } from 'vona';

export function SocketPacket<T extends IDecoratorSocketPacketOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('socketPacket', options);
}
