import type { IDecoratorMiddlewareOptions } from '../../types/middleware.ts';
import { createBeanDecorator } from 'vona';

export function Middleware<T extends IDecoratorMiddlewareOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('middleware', options);
}
