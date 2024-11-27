import { IDecoratorInterceptorOptions } from '../../../index.js';
import { createBeanDecorator } from '../index.js';

export function Interceptor<T extends IDecoratorInterceptorOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('interceptor', options);
}
