import is from 'is-type-of';
import { parseModuleName } from '@cabloy/module-info';
import { Constructable, IDecoratorBeanOptionsBase } from '../decorator/index.js';
import { BeanBase } from '../module/bean/beanBase.js';
import { appMetadata } from './metadata.js';
import { IBeanRecord } from '../../index.js';

export const DecoratorBeanFullName = Symbol.for('decorator#BeanFullName');

export class AppResource extends BeanBase {
  beans: Record<string, IDecoratorBeanOptionsBase> = {};

  addBean<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    // module
    if (!options.module) throw new Error(`module name not parsed for bean: ${options.scene}.${options.name}`);
    // fullName
    const fullName = options.scene ? `${module}.${options.scene}.${options.name}` : options.name;
    // options
    const beanOptions = {
      fullName,
      module: options.module,
      scene: options.scene,
      name: options.name,
      scope: options.scope,
      beanClass: options.beanClass,
    } as IDecoratorBeanOptionsBase<T>;
    // record
    this.beans[beanOptions.fullName] = beanOptions;
    // set metadata
    appMetadata.defineMetaData(DecoratorBeanFullName, fullName, beanOptions.beanClass);
  }

  getBean<T>(A: Constructable<T>): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<T extends IBeanRecord, K extends keyof T>(beanFullName: K): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<T>(beanFullName: string): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<T>(beanFullName: Constructable<T> | string): IDecoratorBeanOptionsBase<T> | undefined {
    let fullName: string | undefined;
    if (typeof beanFullName !== 'string' && is.class(beanFullName)) {
      fullName = appMetadata.getOwnMetaData(DecoratorBeanFullName, beanFullName);
    } else {
      fullName = fullName;
    }
    if (!fullName) return;
    return this.beans[fullName] as IDecoratorBeanOptionsBase<T>;
  }
}

export const appResource = new AppResource();
