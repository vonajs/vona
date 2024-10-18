import { BeanModuleScopeBase } from '../../bean/beanModuleScopeBase.js';
import { IBeanRecord } from '../../bean/type.js';
import { MetadataKey, appMetadata } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorUseOptions } from '../index.js';
import { parseModuleName } from './util.js';

export function Use(options?: IDecoratorUseOptions): PropertyDecorator;
export function Use<T extends keyof IBeanRecord>(beanFullName?: T): PropertyDecorator;
export function Use(options?: IDecoratorUseOptions | string): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    if (!options) options = {};
    if (typeof options === 'string') {
      options = { beanFullName: options } as unknown as IDecoratorUseOptions;
    }
    // beanClass maybe has no specific class type
    const beanClass = appMetadata.getDesignType(target, prop) as Constructable;
    // beanFullName
    let beanFullName: string | undefined = options.beanFullName;
    if (!beanFullName) {
      beanFullName = appResource.getBeanFullName(beanClass);
      if (!beanFullName) throw new Error(`beanFullName not found for: ${beanClass.name}`);
    }
    // selector: maybe moduleScope
    let selector = options.selector;
    if (!selector && beanClass.prototype instanceof BeanModuleScopeBase) {
      selector = parseModuleName();
    }
    // injectionScope
    //   should dynamic get injectionScope when invoke beanContainer
    //      because class has not inited
    const injectionScope = options.injectionScope;
    // record
    appResource.addUse(target, {
      prop,
      beanFullName,
      selector,
      injectionScope,
    });
  };
}
