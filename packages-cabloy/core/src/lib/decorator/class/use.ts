import { MetadataKey, appMetadata } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { BeanModuleBase } from '../../module/index.js';
import { Constructable, IDecoratorUseOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Use(options?: IDecoratorUseOptions): PropertyDecorator {
  return function (target: Object, prop: MetadataKey) {
    if (!options) options = {};
    // beanFullName
    const beanClass = appMetadata.getDesignType(target, prop) as Constructable;
    const beanFullName = appResource.getBeanFullName(beanClass);
    if (!beanFullName) throw new Error(`beanFullName not found for: ${beanClass.name}`);
    // moduleScope
    let moduleScope = options.moduleScope;
    if (!moduleScope && beanClass.prototype instanceof BeanModuleBase) {
      moduleScope = parseModuleName();
    }
    // record
    appResource.addUse(target, {
      prop,
      beanFullName,
      moduleScope,
    });
  };
}
