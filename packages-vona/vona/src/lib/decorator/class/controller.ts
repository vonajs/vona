import { appResource } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Controller(): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'controller',
      name: undefined,
      beanClass: target as unknown as Constructable,
    });
  };
}
