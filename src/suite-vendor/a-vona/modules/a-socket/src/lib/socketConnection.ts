import type { IDecoratorSocketConnectionOptions } from '../types/socketConnection.js';
import { createBeanDecorator } from 'vona';

export function SocketConnection<T extends IDecoratorSocketConnectionOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('socketConnection', options);
}
