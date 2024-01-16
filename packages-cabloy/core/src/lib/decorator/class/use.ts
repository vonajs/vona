import { appMetadata } from '../../core/metadata.js';
import { Constructable } from '../index.js';

export function Use(): PropertyDecorator {
  return function (target: Object, prop: MetadataKey) {
    // beanFullName
    const proto=appMetadata.
    const beanFullName=
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
