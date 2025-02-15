import { createBeanDecorator } from 'vona';
import type { IDecoratorSocketConnectionOptions } from '../types/socketConnection.js';

export function SocketConnection<T extends IDecoratorSocketConnectionOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('socketConnection', options);
}
