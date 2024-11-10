import { appResource, IDecoratorGuardOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Guard<T extends IDecoratorGuardOptions>(options?: T): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'guard',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
