import { appResource } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Atom(): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'atom',
      name: undefined,
      beanClass: target as unknown as Constructable,
    });
  };
}
