import { IDecoratorPacketOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Packet<T extends IDecoratorPacketOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('packet', options);
}
