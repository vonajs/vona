import { appResource } from '../../../index.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Service(): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'service',
      name: undefined,
      beanClass: target as unknown as Constructable,
    });
  };
}
