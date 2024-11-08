import { appResource, IDecoratorMiddlewareOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Middleware(options?: IDecoratorMiddlewareOptions): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'middleware',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
