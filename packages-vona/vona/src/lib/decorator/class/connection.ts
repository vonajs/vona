import { IDecoratorConnectionOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Connection<T extends IDecoratorConnectionOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('connection', options);
}
