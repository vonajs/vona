import { appResource, IDecoratorInterceptorOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Interceptor<T extends IDecoratorInterceptorOptions>(options?: T): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'interceptor',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
