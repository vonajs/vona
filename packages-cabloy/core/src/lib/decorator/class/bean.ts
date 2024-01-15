import { appResource } from '../../core/resource.js';
import { BeanConstructable, IDecoratorBeanOptions, IDecoratorBeanOptionsBase } from '../index.js';
import { parseModuleName } from './util.js';

export function Bean<T>(options: IDecoratorBeanOptions<T>): ClassDecorator {
  return function (target) {
    // module
    const module = parseModuleName();
    // add
    appResource.addBean({
      module,
      scene: options.scene,
      name: options.name,
      scope: options.scope,
      beanClass: target as unknown as BeanConstructable<T>,
    });
  };
}
