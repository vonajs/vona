import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorBeanOptions, IDecoratorBeanOptionsBase } from '../index.js';

export function Bean<T>(options: IDecoratorBeanOptions<T>): ClassDecorator {
  return function (target) {
    const module = '';
    // fullName
    const fullName = options.scene ? `${module}.${options.scene}.${options.name}` : options.name;
    // options
    const beanOptions: IDecoratorBeanOptionsBase<T> = {
      fullName,
      module,
      scene: options.scene,
      name: options.name,
      scope: options.scope,
      beanClass: target as unknown as Constructable<T>,
    };
    appResource.beans[fullName] = beanOptions;
  };
}
