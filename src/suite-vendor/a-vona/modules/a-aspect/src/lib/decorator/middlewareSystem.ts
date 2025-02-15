import type { IDecoratorMiddlewareSystemOptions } from '../../types/middlewareSystem.js';
import { createBeanDecorator } from 'vona';

export function MiddlewareSystem<T extends IDecoratorMiddlewareSystemOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('middlewareSystem', options);
}
