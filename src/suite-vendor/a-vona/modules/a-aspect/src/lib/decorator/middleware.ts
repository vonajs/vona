import { createBeanDecorator } from 'vona';
import { IDecoratorMiddlewareOptions } from '../../types/middleware.js';

export function Middleware<T extends IDecoratorMiddlewareOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('middleware', options);
}
