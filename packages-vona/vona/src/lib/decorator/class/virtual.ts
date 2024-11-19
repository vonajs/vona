import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorVirtualOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Virtual(options?: IDecoratorVirtualOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: options.scene || 'virtual',
      name: options.name,
      beanClass: target as unknown as Constructable,
      virtual: true,
    });
  };
}
