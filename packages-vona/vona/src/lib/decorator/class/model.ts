import { appResource, IDecoratorModelOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Model(options?: IDecoratorModelOptions): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'model',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
