import { Constructable, IDecoratorBeanOptionsBase, IDecoratorUseOptionsBase } from '../decorator/index.js';
import { MetadataKey, appMetadata } from './metadata.js';
import { IBeanRecord } from '../bean/type.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { registerMappedClassMetadataKey } from '../mappedClass/utils.js';
import { toLowerCaseFirstChar } from '@cabloy/word-utils';
import { isClass } from '../utils/isClass.js';

export const SymbolDecoratorBeanFullName = Symbol('SymbolDecoratorBeanFullName');
export const SymbolDecoratorUse = Symbol('SymbolDecoratorUse');

export type IAppResourceRecord = Record<string, IDecoratorBeanOptionsBase>;

export class AppResource extends BeanSimple {
  beans: IAppResourceRecord = {};
  scenes: Record<string, Record<string, IAppResourceRecord>> = {};

  addUse(target: object, options: IDecoratorUseOptionsBase) {
    registerMappedClassMetadataKey(target, SymbolDecoratorUse);
    const uses = appMetadata.getOwnMetadataMap(true, SymbolDecoratorUse, target);
    uses[options.prop] = options;
  }

  getUses(target: object): Record<MetadataKey, IDecoratorUseOptionsBase> | undefined {
    return appMetadata.getMetadata(SymbolDecoratorUse, target);
  }

  addBean(options: Partial<IDecoratorBeanOptionsBase>) {
    let { module, scene, name, beanClass, virtual } = options;
    // name
    name = this._parseBeanName(beanClass!, scene, name);
    // module
    if (!module) throw new Error(`module name not parsed for bean: ${scene}.${name}`);
    // beanFullName
    const beanFullName = scene && scene !== ('bean' as any) ? `${module}.${scene}.${name}` : name;
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
    this.beans[beanFullName] = beanOptions;
    if (!this.scenes[scene!]) this.scenes[scene!] = {};
    if (!this.scenes[scene!][module]) this.scenes[scene!][module] = {};
    this.scenes[scene!][module][beanFullName] = beanOptions;
    // set metadata
    appMetadata.defineMetadata(SymbolDecoratorBeanFullName, beanFullName, beanOptions.beanClass);
    // ok
    return beanOptions;
  }

  getBeanFullName<T>(A: Constructable<T> | undefined): string | undefined;
  getBeanFullName<K extends keyof IBeanRecord>(beanFullName: K): K | undefined;
  getBeanFullName(beanFullName: string): string | undefined;
  getBeanFullName(beanFullName) {
    if (!beanFullName) return beanFullName;
    if (typeof beanFullName === 'function' && isClass(beanFullName)) {
      return appMetadata.getOwnMetadata(SymbolDecoratorBeanFullName, beanFullName);
    }
    return beanFullName;
  }

  getBean<T>(A: Constructable<T>): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<K extends keyof IBeanRecord>(beanFullName: K): IDecoratorBeanOptionsBase<IBeanRecord[K]> | undefined;
  getBean<T>(beanFullName: string): IDecoratorBeanOptionsBase<T> | undefined;
  getBean<T>(beanFullName): IDecoratorBeanOptionsBase<T> | undefined {
    const fullName = this.getBeanFullName(beanFullName);
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
    if (beanClassName.toLocaleUpperCase().startsWith(scene.toLocaleUpperCase())) {
      name = beanClassName.substring(scene.length);
    } else {
      name = beanClassName;
    }
    // lowerCase
    name = toLowerCaseFirstChar(name);
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
