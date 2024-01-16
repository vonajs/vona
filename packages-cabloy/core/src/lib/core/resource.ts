import is from 'is-type-of';
import { parseModuleName } from '@cabloy/module-info';
import { Constructable, IDecoratorBeanOptionsBase, IDecoratorUseOptionsBase } from '../decorator/index.js';
import { BeanBase } from '../module/bean/beanBase.js';
import { appMetadata } from './metadata.js';
import { IBeanRecord } from '../../index.js';

export const DecoratorBeanFullName = Symbol.for('Decorator#BeanFullName');
export const DecoratorUse = Symbol.for('Decorator#Use');

export class AppResource {
  beans: Record<string, IDecoratorBeanOptionsBase> = {};

  addUse(target: Object, options: IDecoratorUseOptionsBase) {
    const records = appMetadata.getOwnMetadataMap(DecoratorUse, target);
    records[options.prop] = options;
    appMetadata.defineMetadata(DecoratorUse, records, target);
  }

  addBean<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    let { module, scene, name, scope, beanClass } = options;
    // name
    name = this._parseBeanName(beanClass!, scene, name);
    // module
    if (!module) throw new Error(`module name not parsed for bean: ${scene}.${name}`);
    // fullName
    const fullName = scene ? `${module}.${scene}.${name}` : name;
    // options
    const beanOptions = {
      fullName,
      module,
      scene,
      name,
      scope,
      beanClass,
    } as IDecoratorBeanOptionsBase<T>;
    beanOptions.__aopChains__ = null!;
    beanOptions.__aopChainsKey__ = {};
    // record
    this.beans[beanOptions.fullName] = beanOptions;
    // set metadata
    appMetadata.defineMetadata(DecoratorBeanFullName, fullName, beanOptions.beanClass);
    // ok
    return beanOptions;
  }

  getBeanFullName<T>(A: Constructable<T>): string | undefined {
    return appMetadata.getOwnMetadata(DecoratorBeanFullName, A);
  }

  getBean<T>(A: Constructable<T>): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<K extends keyof IBeanRecord>(beanFullName: K): IDecoratorBeanOptionsBase<IBeanRecord[K]> | undefined;
  getBean<T>(beanFullName: string): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<T>(beanFullName: Constructable<T> | string): IDecoratorBeanOptionsBase<T> | undefined {
    let fullName: string | undefined;
    if (typeof beanFullName === 'function' && is.class(beanFullName)) {
      fullName = appMetadata.getOwnMetadata(DecoratorBeanFullName, beanFullName);
    } else {
      fullName = beanFullName as string;
    }
    if (!fullName) return null!;
    return this.beans[fullName] as IDecoratorBeanOptionsBase<T>;
  }

  _parseBeanName<T>(beanClass: Constructable<T>, scene?: string, name?: string) {
    // name
    if (name) return name;
    // scene
    if (!scene) scene = 'bean';
    scene = scene.replace(/\./gi, '');
    // bean class name
    const beanClassName = beanClass.name;
    if (beanClassName.toLowerCase().startsWith(scene)) {
      name = beanClassName.substring(scene.length);
    } else {
      name = beanClassName;
    }
    // lowerCase
    name = name.charAt(0).toLowerCase() + name.substring(1);
    return name;
  }
}

export const appResource = new AppResource();
