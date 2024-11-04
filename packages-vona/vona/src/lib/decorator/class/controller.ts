import { appResource } from '../../../index.js';
import { Constructable, IDecoratorControllerOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Controller(options?: IDecoratorControllerOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'controller',
      name: options.name,
      beanClass: target as unknown as Constructable,
    });
  };
}
