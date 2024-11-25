import { appResource, IDecoratorFilterOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Filter<T extends IDecoratorFilterOptions>(options?: T): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'filter',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
