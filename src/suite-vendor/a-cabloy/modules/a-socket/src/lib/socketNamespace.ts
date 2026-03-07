import type { PowerPartial } from 'vona';
import type { IDecoratorSocketNamespaceOptions } from '../types/socketNamespace.ts';
import { createBeanDecorator } from 'vona';

export function SocketNamespace<T extends IDecoratorSocketNamespaceOptions>(options?: PowerPartial<T>): ClassDecorator {
  return createBeanDecorator('socketNamespace', options);
}
