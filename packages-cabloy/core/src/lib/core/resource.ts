import is from 'is-type-of';
import { Constructable, IDecoratorBeanOptionsBase, IDecoratorUseOptionsBase } from '../decorator/index.js';
import { MetadataKey, appMetadata } from './metadata.js';
import { IBeanRecord } from '../module/bean/type.js';

export const DecoratorBeanFullName = Symbol.for('Decorator#BeanFullName');
export const DecoratorUse = Symbol.for('Decorator#Use');

export class AppResource {
  beans: Record<string, IDecoratorBeanOptionsBase> = {};
  aops: Record<string, IDecoratorBeanOptionsBase> = {};

  addUse(target: object, options: IDecoratorUseOptionsBase) {
    const uses = appMetadata.getOwnMetadataMap(DecoratorUse, target);
    uses[options.prop] = options;
    appMetadata.defineMetadata(DecoratorUse, uses, target);
  }

  getUses(target: object): Record<MetadataKey, IDecoratorUseOptionsBase> {
    return appMetadata.getOwnMetadataMap(DecoratorUse, target);
  }

  addAop<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    // bean
    const beanOptions = this.addBean(options);
    // aop
    this.aops[beanOptions.beanFullName] = beanOptions;
    // ok
    return beanOptions;
  }

  findAopsMatched<T>(A: Constructable<T>): string[] | undefined;
  findAopsMatched<K extends keyof IBeanRecord>(beanFullName: K): string[] | undefined;
  findAopsMatched(beanFullName: string): string[] | undefined;
  findAopsMatched<T>(beanFullName: Constructable<T> | string): string[] | undefined {
    // beanOptions
    const beanOptions = this.getBean(beanFullName as any);
    if (!beanOptions) return;
    // loop
    const aops: string[] = [];
    for (const key in this.aops) {
      const aop = this.aops[key];
      // not self
      if (key === beanOptions.beanFullName) continue;
      // // check if match aop
      // if (beanOptions.aop && !aop.matchAop) continue;
      // match
      if (__aopMatch(aop.aopMatch, beanOptions.beanFullName)) {
        aops.push(key);
      }
    }
    return aops;
  }

  addBean<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    let { module, scene, name, beanClass, virtual } = options;
    // name
    name = this._parseBeanName(beanClass!, scene, name);
    // module
    if (!module) throw new Error(`module name not parsed for bean: ${scene}.${name}`);
    // beanFullName
    const beanFullName = scene ? `${module}.${scene}.${name}` : name;
    // moduleBelong
    const moduleBelong = this._parseModuleBelong(module, beanClass, virtual);
    // options
    const beanOptions = {
      ...options,
      beanFullName,
      name,
      moduleBelong,
    } as IDecoratorBeanOptionsBase<T>;
    beanOptions.__aopChains__ = null!;
    beanOptions.__aopChainsKey__ = {};
    // record
    this.beans[beanOptions.beanFullName] = beanOptions;
    // set metadata
    appMetadata.defineMetadata(DecoratorBeanFullName, beanFullName, beanOptions.beanClass);
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

  _parseModuleBelong(module, beanClass, virtual) {
    // not set when virtual
    if (virtual) return;
    // check parent
    let moduleBelong;
    const parent = Object.getPrototypeOf(beanClass);
    if (parent) {
      const beanOptions = this.getBean(parent);
      if (beanOptions && beanOptions.moduleBelong) {
        moduleBelong = beanOptions.moduleBelong;
      }
    }
    // set to current when parent not set
    if (!moduleBelong) {
      moduleBelong = module;
    }
    return moduleBelong;
  }

  _getModuleBelong<T>(A: Constructable<T>): string {
    const beanOptions = this.getBean(A);
    if (!beanOptions || !beanOptions.moduleBelong) throw new Error(`not found module belong: ${A.constructor.name}`);
    return beanOptions.moduleBelong;
  }
}

export const appResource = new AppResource();

function __aopMatch(match, beanFullName) {
  if (!Array.isArray(match)) {
    return (typeof match === 'string' && match === beanFullName) || (is.regExp(match) && match.test(beanFullName));
  }
  return match.some(item => __aopMatch(item, beanFullName));
}
