import { appResource } from '../../../index.js';
import { Constructable, IDecoratorModelOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Model<T>(options: IDecoratorModelOptions): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'model',
      name: options.name,
      beanClass: target as unknown as Constructable<T>,
      options,
    });
  };
}
