import type { IBeanSceneRecord } from '../interface/beanOptions.ts';
import type { Constructable } from '../type/constructable.ts';
import { appResource } from '../../core/resource.ts';
import { parseModuleName } from './util.ts';

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
