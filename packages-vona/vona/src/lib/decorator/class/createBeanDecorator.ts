import { appResource } from '../../core/resource.js';
import { IBeanSceneRecord } from '../interface/beanOptions.js';
import { Constructable } from '../type/constructable.js';
import { parseModuleName } from './util.js';

export function createBeanDecorator<T>(
  scene: keyof IBeanSceneRecord,
  options?: T,
  optionsPrimitive?: boolean,
  virtual?: boolean,
): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // name
    const name = scene === 'scope' ? 'module' : undefined;
    // add
    appResource.addBean({
      module,
      scene,
      name,
      beanClass: target as unknown as Constructable,
      options,
      optionsPrimitive,
      virtual,
    });
  };
}
