import is from 'is-type-of';
import {
  Constructable,
  IDecoratorAopOptions,
  IDecoratorBeanOptionsBase,
  IDecoratorUseOptionsBase,
} from '../decorator/index.js';
import { MetadataKey, appMetadata } from './metadata.js';
import { IBeanRecord } from '../bean/type.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { isClass } from '../utils/isClass.js';

export const DecoratorBeanFullName = Symbol.for('Decorator#BeanFullName');
export const DecoratorUse = Symbol.for('Decorator#Use');

export class AppResource extends BeanSimple {
  beans: Record<string, IDecoratorBeanOptionsBase> = {};
  aops: Record<string, IDecoratorBeanOptionsBase> = {};
  aopsArray: IDecoratorBeanOptionsBase[] = [];

  addUse(target: object, options: IDecoratorUseOptionsBase) {
    const uses = appMetadata.getOwnMetadataMap(DecoratorUse, target);
    uses[options.prop] = options;
  }

  getUses(target: object): Record<MetadataKey, IDecoratorUseOptionsBase> | undefined {
    return appMetadata.getMetadata(DecoratorUse, target);
  }

  addAop<T>(options: Partial<IDecoratorBeanOptionsBase<T>>) {
    // bean
    const beanOptions = this.addBean(options);
    // aop
    this.aops[beanOptions.beanFullName] = beanOptions;
    this.aopsArray.push(beanOptions);
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
    const aopsMatched: string[] = [];
    for (const aop of this.aopsArray) {
      const aopOptions = aop.options as IDecoratorAopOptions;
      // not self
      if (aop.beanFullName === beanOptions.beanFullName) continue;
      // // check if match aop
      // if (beanOptions.aop && !aop.matchAop) continue;
      // gate
      if (!this.app.meta.util.checkGate(aopOptions.gate)) continue;
      // match
      if (__aopMatch(aopOptions.match, beanOptions.beanFullName)) {
        aopsMatched.push(aop.beanFullName);
      }
    }
    return aopsMatched;
  }

  addBean(options: Partial<IDecoratorBeanOptionsBase>) {
    let { module, scene, name, beanClass, virtual } = options;
    // name
    name = this._parseBeanName(beanClass!, scene, name);
    // module
    if (!module) throw new Error(`module name not parsed for bean: ${scene}.${name}`);
    // beanFullName
    const beanFullName = scene && scene !== 'bean' ? `${module}.${scene}.${name}` : name;
    // moduleBelong
    const moduleBelong = this._parseModuleBelong(module, beanClass, virtual);
    // options
    const beanOptions = {
      ...options,
      beanFullName,
      name,
      moduleBelong,
    } as IDecoratorBeanOptionsBase;
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
    if (typeof beanFullName === 'function' && isClass(beanFullName)) {
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
    let parent = Object.getPrototypeOf(beanClass);
    while (parent) {
      const beanOptions = this.getBean(parent);
      if (beanOptions && beanOptions.moduleBelong) {
        moduleBelong = beanOptions.moduleBelong;
        break;
      }
      parent = Object.getPrototypeOf(parent);
    }
    // set to current when parent not set
    if (!moduleBelong) {
      moduleBelong = module;
    }
    return moduleBelong;
  }

  _getModuleBelong<T>(A: Constructable<T>): string;
  _getModuleBelong<K extends keyof IBeanRecord>(beanFullName: K): string;
  _getModuleBelong(beanFullName: string): string;
  _getModuleBelong<T>(beanFullName: Constructable<T> | string): string {
    const beanOptions = this.getBean(beanFullName as any);
    if (!beanOptions || !beanOptions.moduleBelong) throw new Error(`not found module belong: ${beanFullName}`);
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
