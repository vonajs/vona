import { appResource } from '../../../index.js';
import { Constructable, IDecoratorLocalOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Local<T>(options?: IDecoratorLocalOptions<T>): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'local',
      name: options.name,
      scope: options.scope,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
