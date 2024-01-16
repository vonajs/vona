import { Constructable } from '../index.js';

export function Use(): PropertyDecorator {
  return function (target: Object, prop: string | symbol) {
    // beanFullName
    // add
    appResource.addBean({
      module,
      scene: options.scene,
      name: options.name,
      scope: options.scope,
      beanClass: target as unknown as Constructable<T>,
    });
  };
}
