import { appResource } from '../../core/resource.js';
import { TypeDecoratorBeanOptionsSceneBase } from '../interface/beanOptions.js';
import { Constructable } from '../type/constructable.js';
import { parseModuleName } from './util.js';

export function createBeanDecorator<T>(
  scene: TypeDecoratorBeanOptionsSceneBase,
  options?: T,
  optionsPrimitive?: boolean,
  virtual?: boolean,
): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene,
      name: undefined,
      beanClass: target as unknown as Constructable,
      options,
      optionsPrimitive,
      virtual,
    });
  };
}
