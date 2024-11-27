import { IDecoratorMiddlewareOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Middleware<T extends IDecoratorMiddlewareOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('middleware', options);
}
