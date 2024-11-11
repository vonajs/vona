import { appResource, IDecoratorPipeOptions } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Pipe<T extends IDecoratorPipeOptions>(options?: T): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'pipe',
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
    });
  };
}
