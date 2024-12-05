import { IDecoratorSocketConnectionOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function SummerCache<T extends IDecoratorSocketConnectionOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('summerCache', options);
}
