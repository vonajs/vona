import { IDecoratorSocketConnectionOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function SocketConnection<T extends IDecoratorSocketConnectionOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('socketConnection', options);
}
