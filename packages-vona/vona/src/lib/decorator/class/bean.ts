import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorBeanOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Bean(options?: IDecoratorBeanOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: options.scene || 'bean',
      name: options.name,
      beanClass: target as unknown as Constructable,
    });
  };
}
