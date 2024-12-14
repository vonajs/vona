import { createBeanDecorator } from 'vona';
import { IDecoratorInterceptorOptions } from '../../types/interceptor.js';

export function Interceptor<T extends IDecoratorInterceptorOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('interceptor', options);
}
