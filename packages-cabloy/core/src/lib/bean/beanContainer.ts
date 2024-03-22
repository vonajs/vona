import is from 'is-type-of';
import { CabloyApplication, CabloyContext } from '../../types/index.js';
import { Constructable } from '../decorator/index.js';
import { appResource } from '../core/resource.js';
import { MetadataKey } from '../core/metadata.js';
import { IBeanRecord, IBeanScopeRecord, TypeBeanRecord, TypeBeanScopeRecordKeys } from './type.js';
import { BeanBase } from './beanBase.js';
import { BeanSimple } from './beanSimple.js';

const ProxyMagic = Symbol.for('Bean#ProxyMagic');
const BeanContainerInstances = Symbol.for('Bean#Instances');
// const BeanInstanceScope = Symbol('BeanInstance#Scope');

export class BeanContainer {
  private app: CabloyApplication;
  private ctx: CabloyContext;

  private [BeanContainerInstances]: Record<string, object> = {};

  constructor(app: CabloyApplication, ctx: CabloyContext) {
    this.app = app;
    this.ctx = ctx;
  }

  /** get specific module's scope */
  scope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
  scope<T>(moduleScope: string): T;
  scope<T>(moduleScope: string): T {
    return this._getBean(`${moduleScope}.scope.module`);
  }

  _getBean<T>(A: Constructable<T>): T;
  _getBean<K extends keyof IBeanRecord>(beanFullName: K): IBeanRecord[K];
  _getBean<T>(beanFullName: string): T;
  _getBean<T>(beanFullName: Constructable<T> | string): T {
    return this._getBeanSelector(beanFullName as any);
  }

  _getBeanSelector<T>(A: Constructable<T>, selector?: string): T;
  _getBeanSelector<K extends keyof IBeanRecord>(beanFullName: K, selector?: string): IBeanRecord[K];
  _getBeanSelector<T>(beanFullName: string, selector?: string): T;
  _getBeanSelector<T>(beanFullName: Constructable<T> | string, selector?: string): T {
    // bean options
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) {
      // not found
      return null!;
    }
    const fullName = beanOptions.beanFullName;
    // same as _getBean if selector is undefined/null/'', as as to get the same bean instance
    //   not use !selector which maybe is 0
    const key = selector === undefined || selector === null || selector === '' ? fullName : `${fullName}#${selector}`;
    if (this[BeanContainerInstances][key] === undefined) {
      this[BeanContainerInstances][key] = this._newBeanSelector(fullName, selector);
    }
    return this[BeanContainerInstances][key] as T;
  }

  _newBean<T>(A: Constructable<T>, ...args): T;
  _newBean<K extends keyof IBeanRecord>(beanFullName: K, ...args): IBeanRecord[K];
  _newBean<T>(beanFullName: string, ...args): T;
  _newBean<T>(beanFullName: Constructable<T> | string, ...args): T {
    // bean options
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) {
      // class
      if (typeof beanFullName === 'function' && is.class(beanFullName)) {
        const beanInstance = this._createBeanInstance(beanFullName, beanFullName, args);
        return this._patchBeanInstance(beanFullName, beanInstance, false);
      }
      // throw new Error(`bean not found: ${beanFullName}`);
      return null!;
    }
    // instance
    const beanInstance = this._createBeanInstance(beanOptions.beanFullName, beanOptions.beanClass, args);
    // patch
    return this._patchBeanInstance(beanOptions.beanFullName, beanInstance, beanOptions.aop);
  }

  _newBeanSelector<T>(A: Constructable<T>, selector?: string, ...args): T;
  _newBeanSelector<K extends keyof IBeanRecord>(beanFullName: K, selector?: string, ...args): IBeanRecord[K];
  _newBeanSelector<T>(beanFullName: string, selector?: string, ...args): T;
  _newBeanSelector<T>(beanFullName: Constructable<T> | string, selector?: string, ...args): T {
    return this._newBean(beanFullName as any, selector, ...args);
  }

  private _createBeanInstance(beanFullName, beanClass, args) {
    // create
    let beanInstance;
    if (beanClass.prototype.__init__) {
      beanInstance = new beanClass();
    } else {
      beanInstance = new beanClass(...args);
    }
    // app/ctx
    if (beanInstance instanceof BeanSimple) {
      // app
      (<any>beanInstance).app = this.app;
      // ctx: always set even if is null, so as to prevent magic method __get__ take effect.
      (<any>beanInstance).ctx = this.ctx;
    }
    // beanFullName
    if (typeof beanFullName === 'string') {
      __setPropertyValue(beanInstance, '__beanFullName__', beanFullName);
    }
    /// / scope
    // this._injectBeanInstanceScope(beanInstance, beanFullName);
    // inject
    this._injectBeanInstance(beanInstance, beanFullName);
    // init
    if (beanInstance.__init__) {
      beanInstance.__init__(...args);
    }
    // ok
    return beanInstance;
  }

  private _injectBeanInstance(beanInstance, beanFullName) {
    const beanOptions = appResource.getBean(beanFullName);
    if (!beanOptions) return;
    const uses = appResource.getUses(beanOptions.beanClass.prototype);
    for (const key in uses) {
      const useOptions = uses[key];
      const selector = useOptions.selector;
      const containerScope = useOptions.containerScope;
      this._injectBeanInstancePropLazy(
        beanInstance,
        useOptions.prop,
        useOptions.beanFullName,
        selector,
        containerScope,
      );
    }
  }

  private _injectBeanInstancePropLazy(instance, prop, targetBeanFullName, selector?: string, containerScope?: string) {
    const self = this;
    Object.defineProperty(instance, prop, {
      enumerable: true,
      configurable: true,
      get() {
        const symbol = Symbol.for(`__bean_use__#${prop}`);
        if (!instance[symbol]) {
          instance[symbol] = self._injectBeanInstanceProp(targetBeanFullName, selector, containerScope);
        }
        return instance[symbol];
      },
    });
  }

  private _injectBeanInstanceProp(targetBeanFullName, selector?: string, containerScope?: string) {
    // containerScope
    if (!containerScope) {
      const targetOptions = appResource.getBean(targetBeanFullName);
      if (!targetOptions) {
        throw new Error(`not found bean class: ${targetBeanFullName}`);
      }
      containerScope = targetOptions.containerScope || 'ctx';
    }
    // targetInstance
    let targetInstance;
    // selector maybe empty string
    if (selector) {
      if (containerScope === 'app') {
        targetInstance = this.app.bean._getBeanSelector(targetBeanFullName, selector);
      } else if (containerScope === 'ctx') {
        targetInstance = this._getBeanSelector(targetBeanFullName, selector);
      } else if (containerScope === 'new') {
        targetInstance = this._newBeanSelector(targetBeanFullName, selector);
      }
    } else {
      if (containerScope === 'app') {
        targetInstance = this.app.bean._getBean(targetBeanFullName);
      } else if (containerScope === 'ctx') {
        targetInstance = this._getBean(targetBeanFullName);
      } else if (containerScope === 'new') {
        targetInstance = this._newBean(targetBeanFullName);
      }
    }
    return targetInstance;
  }

  // private _injectBeanInstanceScope(beanInstance, beanFullName) {
  //   if (typeof beanFullName !== 'string' || beanFullName.indexOf('.scope.module') > -1) return;
  //   Object.defineProperty(beanInstance, 'scope', {
  //     enumerable: false,
  //     configurable: true,
  //     get() {
  //       if (!this[BeanInstanceScope]) {
  //         this[BeanInstanceScope] = this.bean._getBean(`${this.moduleBelong}.scope.module`);
  //       }
  //       return this[BeanInstanceScope];
  //     },
  //   });
  // }

  private _patchBeanInstance(beanFullName, beanInstance, aop) {
    // not aop on aop
    if (aop) return beanInstance;
    // aop chains
    const _aopChains = this._prepareAopChains(beanFullName, beanInstance);
    // no aop
    if (_aopChains.length === 0) return beanInstance;
    // aop
    return this._newBeanProxy(beanFullName, beanInstance);
  }

  private _newBeanProxy(beanFullName, beanInstance) {
    const self = this;
    return new Proxy(beanInstance, {
      get(target, prop, receiver) {
        if (typeof prop === 'symbol') {
          return target[prop];
        }
        // descriptorInfo
        const descriptorInfo = __getPropertyDescriptor(target, prop);
        if (!__checkAopOfDescriptorInfo(descriptorInfo)) return target[prop];
        const methodType = __methodTypeOfDescriptor(descriptorInfo);
        // get prop
        if (!methodType) {
          const methodName = `__get_${prop}__`;
          const methodNameMagic = '__get__';
          const _aopChainsProp = self._getAopChainsProp(beanFullName, methodName, methodNameMagic);
          if (_aopChainsProp.length === 0) return target[prop];
          // context
          const context = {
            target,
            receiver,
            prop,
            value: undefined,
          };
          // aop
          self.__composeForProp(_aopChainsProp)(context, (context, next) => {
            if (context.value === undefined) {
              if (!descriptorInfo && target.__get__) {
                context.value = target.__get__(prop);
              } else {
                context.value = target[prop];
              }
            }
            next();
          });
          // ok
          return context.value;
        }
        // method
        return self._getInstanceMethodProxy(beanFullName, target, prop, methodType);
      },
      set(target, prop, value, receiver) {
        if (typeof prop === 'symbol') {
          target[prop] = value;
          return true;
        }
        // descriptorInfo
        const descriptorInfo = __getPropertyDescriptor(target, prop);
        if (!__checkAopOfDescriptorInfo(descriptorInfo)) {
          target[prop] = value;
          return true;
        }
        const methodName = `__set_${prop}__`;
        const methodNameMagic = '__set__';
        const _aopChainsProp = self._getAopChainsProp(beanFullName, methodName, methodNameMagic);
        if (_aopChainsProp.length === 0) {
          target[prop] = value;
          return true;
        }
        // context
        const context = {
          target,
          receiver,
          prop,
          value,
        };
        // aop
        self.__composeForProp(_aopChainsProp)(context, (context, next) => {
          if (!descriptorInfo && target.__set__) {
            target.__set__(prop, context.value);
          } else {
            target[prop] = context.value;
          }
          next();
        });
        // ok
        return true;
      },
    });
  }

  private _getInstanceMethodProxy(beanFullName, beanInstance, prop, methodType) {
    const self = this;
    // not aop magic methods
    if (['__get__', '__set__'].includes(prop)) {
      return beanInstance[prop];
    }
    // aop chains
    const _aopChainsProp = this._getAopChainsProp(beanFullName, prop, null);
    if (_aopChainsProp.length === 0) return beanInstance[prop];
    // proxy
    const methodProxyKey = `__aopproxy_method_${prop}__`;
    if (beanInstance[methodProxyKey]) return beanInstance[methodProxyKey];
    const methodProxy = new Proxy(beanInstance[prop], {
      apply(target, thisArg, args) {
        // context
        const context = {
          target: beanInstance,
          receiver: thisArg,
          prop,
          arguments: args,
          result: undefined,
        };
        // aop
        if (methodType === 'Function') {
          self.__composeForProp(_aopChainsProp)(context, (context, next) => {
            if (context.result === undefined) {
              context.result = target.apply(thisArg, args);
            }
            next();
          });
          // ok
          return context.result;
        }
        if (methodType === 'AsyncFunction') {
          return new Promise((resolve, reject) => {
            self
              .__composeForPropAsync(_aopChainsProp)(context, async (context, next) => {
                if (context.result === undefined) {
                  context.result = await target.apply(thisArg, args);
                }
                await next();
              })
              .then(() => {
                resolve(context.result);
              })
              .catch(err => {
                reject(err);
              });
          });
        }
      },
    });
    __setPropertyValue(beanInstance, methodProxyKey, methodProxy);
    return methodProxy;
  }

  private _prepareAopChains(beanFullName, beanInstance) {
    // beanFullName maybe class
    const beanOptions = appResource.getBean(beanFullName);
    const host = beanOptions || beanFullName;
    if (host.__aopChains__) return host.__aopChains__;
    // chains
    let chains: MetadataKey[] = [];
    if (beanOptions && !beanOptions.aop) {
      const aops = appResource.findAopsMatched(beanOptions.beanFullName);
      if (aops) {
        chains = chains.concat(aops);
      }
    }
    // magic self
    if (__hasMagicMothod(beanInstance)) {
      chains.push(ProxyMagic);
    }
    // hold
    host.__aopChains__ = chains;
    return chains;
  }

  private _getAopChains(beanFullName) {
    // beanFullName maybe class
    const beanOptions = appResource.getBean(beanFullName);
    const host = beanOptions || beanFullName;
    return host.__aopChains__;
  }

  private _getAopChainsProp(beanFullName, methodName, methodNameMagic) {
    const chainsKey = `__aopChains_${methodName}__`;
    const beanOptions = appResource.getBean(beanFullName);
    const host = beanOptions || beanFullName;
    if (!host.__aopChainsKey__) host.__aopChainsKey__ = {};
    if (host.__aopChainsKey__[chainsKey]) return host.__aopChainsKey__[chainsKey];
    const _aopChains = this._getAopChains(beanFullName);
    const chains: [MetadataKey, string][] = [];
    for (const aopKey of _aopChains) {
      if (aopKey === ProxyMagic) {
        chains.push([aopKey, methodName]);
      } else {
        const aop: any = this._getBean(aopKey as string);
        if (aop[methodName]) {
          chains.push([aopKey, methodName]);
        } else if (methodNameMagic && aop[methodNameMagic]) {
          chains.push([aopKey, methodNameMagic]);
        }
      }
    }
    host.__aopChainsKey__[chainsKey] = chains;
    return chains;
  }

  private __composeForPropAdapter = (_context, chain) => {
    const [aopKey, methodName] = chain;
    // ProxyMagic
    if (aopKey === ProxyMagic) return null;
    // chain
    const aop = this._getBean(aopKey);
    if (!aop) throw new Error(`aop not found: ${chain}`);
    if (!aop[methodName]) return null;
    return {
      receiver: aop,
      fn: aop[methodName],
    };
  };

  private __composeForProp(chains) {
    return this.app.meta.util.compose(chains, this.__composeForPropAdapter);
  }

  private __composeForPropAsync(chains) {
    return this.app.meta.util.composeAsync(chains, this.__composeForPropAdapter);
  }
}

export type BeanContainerLike = TypeBeanRecord & BeanContainer;

export function BeanContainerCreate(app, ctx) {
  const beanContainer = new BeanContainer(app, ctx);
  return new Proxy(beanContainer, {
    get(obj, prop) {
      if (typeof prop === 'symbol') return obj[prop];
      if (obj[prop]) return obj[prop];
      return obj._getBean(prop);
    },
  });
}

function __checkAopOfDescriptorInfo(descriptorInfo) {
  if (!descriptorInfo) return true;
  return !descriptorInfo.dynamic && !descriptorInfo.ofBeanBase;
}

function __getPropertyDescriptor(obj, prop) {
  // dynamic
  const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (descriptor) return { descriptor, dynamic: true };
  // static
  return __getPropertyDescriptorStatic(obj, prop);
}

function __getPropertyDescriptorStatic(obj, prop) {
  let proto = Object.getPrototypeOf(obj);
  let ofBeanBase = false;
  while (proto) {
    if (proto.constructor.name === BeanBase.name) {
      ofBeanBase = true;
    }
    const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
    if (descriptor) return { descriptor, dynamic: false, ofBeanBase };
    proto = Object.getPrototypeOf(proto);
  }
  return null;
}

function __setPropertyValue(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return value;
    },
  });
}

function __hasMagicMothod(instance) {
  return !!instance.__get__ || !!instance.__set__;
}

function __methodTypeOfDescriptor(descriptorInfo) {
  if (!descriptorInfo) return null;
  const { descriptor, dynamic } = descriptorInfo;
  if (dynamic) return null;
  if (descriptor.get) return null;
  const methodType = descriptor.value?.constructor?.name;
  if (['Function', 'AsyncFunction'].includes(methodType)) {
    return methodType;
  }
  return null;
}
