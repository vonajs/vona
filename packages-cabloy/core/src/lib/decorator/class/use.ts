import { BeanModuleScopeBase } from '../../bean/beanModuleScopeBase.js';
import { MetadataKey, appMetadata } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorUseOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Use(options?: IDecoratorUseOptions): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    if (!options) options = {};
    // beanClass maybe has no specific class type
    const beanClass = appMetadata.getDesignType(target, prop) as Constructable;
    // beanFullName
    let beanFullName = options.beanFullName;
    if (!beanFullName) {
      beanFullName = appResource.getBeanFullName(beanClass);
      if (!beanFullName) throw new Error(`beanFullName not found for: ${beanClass.name}`);
    }
    // moduleScope
    let moduleScope = options.moduleScope;
    if (!moduleScope && beanClass.prototype instanceof BeanModuleScopeBase) {
      moduleScope = parseModuleName();
    }
    // containerScope
    let containerScope = options.containerScope;
    if (!containerScope) {
      const targetOptions = appResource.getBean(beanFullName)!;
      containerScope = targetOptions.containerScope || 'ctx';
    }
    // record
    appResource.addUse(target, {
      prop,
      beanFullName,
      moduleScope,
      containerScope,
    });
  };
}
