import { MetadataKey, appMetadata } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { Constructable } from '../index.js';

export function Use(): PropertyDecorator {
  return function (target: Object, prop: MetadataKey) {
    // beanFullName
    const proto = appMetadata.getDesignType(target, prop);
    const beanFullName = appResource.getBeanFullName(proto as any);
    // record
    appResource.addUse({
      prop,
      beanFullName,
    });
  };
}
