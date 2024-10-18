import { appResource } from '../../../index.js';
import { Constructable, IDecoratorLocalOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Local<T>(options?: IDecoratorLocalOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'local',
      name: options.name,
      containerScope: options.containerScope,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
