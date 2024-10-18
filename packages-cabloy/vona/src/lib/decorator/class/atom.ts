import { appResource } from '../../../index.js';
import { Constructable, IDecoratorAtomOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Atom<T>(options?: IDecoratorAtomOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'atom',
      name: options.name,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
