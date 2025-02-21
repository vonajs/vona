import type { IDecoratorMiddlewareSystemOptions } from '../../types/middlewareSystem.ts';
import { createBeanDecorator } from 'vona';

export function MiddlewareSystem<T extends IDecoratorMiddlewareSystemOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('middlewareSystem', options);
}
