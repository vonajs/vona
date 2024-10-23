import { appResource } from '../../../index.js';
import { Constructable, IDecoratorServiceOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Service<T>(options?: IDecoratorServiceOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'service',
      name: options.name,
      containerScope: options.containerScope,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
