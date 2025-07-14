import type { IBeanSceneRecord } from '../interface/beanOptions.ts';
import type { Constructable } from '../type/constructable.ts';
import { appResource } from '../../core/resource.ts';
import { parseModuleName } from './util.ts';

export function createBeanDecorator<T>(
  scene: keyof IBeanSceneRecord,
  options?: T,
  optionsPrimitive?: boolean,
  fn?: (target: Constructable) => void,
): ClassDecorator {
  return function (target) {
    const beanClass = target as unknown as Constructable;
    // module
    const module = parseModuleName(beanClass);
    // name
    const name = scene === 'scope' ? 'module' : undefined;
    // add
    appResource.addBean({
      module,
      scene,
      name,
      beanClass,
      options,
      optionsPrimitive,
    });
    // fn
    fn?.(beanClass);
  };
}
