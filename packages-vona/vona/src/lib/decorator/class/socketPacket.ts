import { IDecoratorSocketPacketOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function SocketPacket<T extends IDecoratorSocketPacketOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('socketPacket', options);
}
