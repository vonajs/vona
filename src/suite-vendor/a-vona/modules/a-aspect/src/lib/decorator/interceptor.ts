import type { IDecoratorInterceptorOptions } from '../../types/interceptor.ts';
import { createBeanDecorator } from 'vona';

export function Interceptor<T extends IDecoratorInterceptorOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('interceptor', options);
}
