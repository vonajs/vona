import { appResource } from '../../core/resource.js';
import { Constructable } from '../index.js';
import { parseModuleName } from './util.js';

export function Scope<T>(): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: 'scope',
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
