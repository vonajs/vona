import { appResource, IDecoratorConnectionOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Connection<T extends IDecoratorConnectionOptions>(options?: T): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'connection',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
