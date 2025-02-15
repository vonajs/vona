import type { IBeanSceneRecord } from '../interface/beanOptions.js';
import type { Constructable } from '../type/constructable.js';
import { appResource } from '../../core/resource.js';
import { parseModuleName } from './util.js';

export function createBeanDecorator<T>(
  scene: keyof IBeanSceneRecord,
  options?: T,
  optionsPrimitive?: boolean,
  virtual?: boolean,
  fn?: (target: Constructable) => void,
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
    // fn
    fn?.(target as unknown as Constructable);
  };
}
