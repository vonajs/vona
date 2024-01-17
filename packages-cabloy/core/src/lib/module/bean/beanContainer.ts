import is from 'is-type-of';
import { CabloyApplication, CabloyContext, IBeanRecord, TypeBeanRecord } from '../../../type/index.js';
import { Constructable } from '../../decorator/index.js';
import { appResource } from '../../core/resource.js';
import { MetadataKey, appMetadata } from '../../core/metadata.js';
import { BeanLocal } from './beanLocal.js';

const ProxyMagic = Symbol.for('Bean#ProxyMagic');
const BeanContainerInstances = Symbol.for('Bean#Instances');
const BeanContainerInstancesModule = Symbol.for('Bean#InstancesModule');

export class BeanContainer {
  app: CabloyApplication;
  ctx: CabloyContext;
  local: BeanLocal;
  [BeanContainerInstances]: Record<string, Constructable> = {};
  [BeanContainerInstancesModule]: Record<string, Constructable> = {};

  constructor(app: CabloyApplication, ctx: CabloyContext) {
    this.app = app;
    this.ctx = ctx;
    this.local = this._newBean(BeanLocal);
  }

  _register(moduleName, beanName, beanClass) {
    const beanFullName = beanClass.global
      ? beanName
      : `${typeof moduleName === 'string' ? moduleName : moduleName.relativeName}.${beanName}`;
    (<any>this.app.meta).beans[beanFullName] = beanClass;
    return beanFullName;
  }

  _registerAop(moduleName, aopName, aopClass) {
    const beanName = `aop.${aopName}`;
    const beanClass = {
      bean: aopClass.bean,
      aop: true,
    };
    const beanFullName = this._register(moduleName, beanName, beanClass);
    this.app.meta.aops[beanFullName] = { match: aopClass.match, matchAop: aopClass.matchAop };
    return beanFullName;
  }

  getBeanFullName<T>(A: Constructable<T>): string | undefined {
    return appResource.getBeanFullName(A);
  }

  _getBean<T>(A: Constructable<T>): T;
  _getBean<K extends keyof IBeanRecord>(beanFullName: K): IBeanRecord[K];
  _getBean<T>(beanFullName: string): T;
  _getBean<T>(beanFullName: Constructable<T> | string): T {
    // bean options
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) {
      // not found
      return null!;
    }
    const fullName = beanOptions.beanFullName;
    if (this[BeanContainerInstances][fullName] === undefined) {
      this[BeanContainerInstances][fullName] = this._newBean(fullName);
    }
    return this[BeanContainerInstances][fullName] as T;
  }

  _getBeanModule<T>(A: Constructable<T>, moduleScope): T;
  _getBeanModule<K extends keyof IBeanRecord>(beanFullName: K, moduleScope): IBeanRecord[K];
  _getBeanModule<T>(beanFullName: string, moduleScope): T;
  _getBeanModule<T>(beanFullName: Constructable<T> | string, moduleScope): T {
    // bean options
    const beanOptions = appResource.getBean(beanFullName as any);
    if (!beanOptions) {
      // not found
      return null!;
    }
    const fullName = beanOptions.beanFullName;
    const key = `${fullName}#${moduleScope}`;
    if (this[BeanContainerInstancesModule][key] === undefined) {
      this[BeanContainerInstancesModule][key] = this._newBeanModule(fullName, moduleScope);
    }
    return this[BeanContainerInstancesModule][key] as T;
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
        const beanInstance = new beanFullName(...args);
        return this._patchBeanInstance(beanInstance, args, beanFullName, false);
      }
      // throw new Error(`bean not found: ${beanFullName}`);
      return null!;
    }
    // instance
    const beanInstance = new beanOptions.beanClass(...args);
    // patch
    return this._patchBeanInstance(beanInstance, args, beanFullName, beanOptions.aop);
  }

  _newBeanModule<T>(A: Constructable<T>, moduleScope, ...args): T;
  _newBeanModule<K extends keyof IBeanRecord>(beanFullName: K, moduleScope, ...args): IBeanRecord[K];
  _newBeanModule<T>(beanFullName: string, moduleScope, ...args): T;
  _newBeanModule<T>(beanFullName: Constructable<T> | string, moduleScope, ...args): T {
    return this._newBean(beanFullName as any, moduleScope, ...args);
  }

  _injectBeanInstance(beanInstance, beanFullName) {
    const beanOptions = appResource.getBean(beanFullName);
    if (!beanOptions) return;
    const uses = appResource.getUses(beanOptions.beanClass.prototype);
    for (const key in uses) {
      const useOptions = uses[key];
      const targetOptions = appResource.getBean(useOptions.beanFullName)!;
      const targetBeanFullName = targetOptions.beanFullName;
      const scope = targetOptions.scope || 'ctx';
      const moduleScope = useOptions.moduleScope;
      beanInstance[useOptions.prop] = this._injectBeanInstanceProp(targetBeanFullName, scope, moduleScope);
    }
  }

  _injectBeanInstanceProp(targetBeanFullName, scope, moduleScope) {
    let targetInstance;
    if (moduleScope) {
      if (scope === 'app') {
        targetInstance = this.app.bean._getBeanModule(targetBeanFullName, moduleScope);
      } else if (scope === 'ctx') {
        targetInstance = this._getBeanModule(targetBeanFullName, moduleScope);
      } else if (scope === 'transient') {
        targetInstance = this._newBeanModule(targetBeanFullName, moduleScope);
      }
    } else {
      if (scope === 'app') {
        targetInstance = this.app.bean._getBean(targetBeanFullName);
      } else if (scope === 'ctx') {
        targetInstance = this._getBean(targetBeanFullName);
      } else if (scope === 'transient') {
        targetInstance = this._newBean(targetBeanFullName);
      }
    }

    return targetInstance;
  }

  _patchBeanInstance(beanInstance, args, beanFullName, aop) {
    // app/ctx
    if (this.app) {
      beanInstance.app = this.app;
    }
    if (this.ctx) {
      beanInstance.ctx = this.ctx;
    }
    // inject
    this._injectBeanInstance(beanInstance, beanFullName);
    // init
    if (beanInstance.__init__) {
      beanInstance.__init__(...args);
    }
    // not aop on aop
    if (aop) return beanInstance;
    // aop chains
    const _aopChains = this._prepareAopChains(beanFullName, beanInstance);
    // no aop
    if (_aopChains.length === 0) return beanInstance;
    // aop
    return this._newBeanProxy(beanFullName, beanInstance);
  }

  _newBeanProxy(beanFullName, beanInstance) {
    const self = this;
    return new Proxy(beanInstance, {
      get(target, prop, receiver) {
        if (typeof prop === 'symbol') {
          return target[prop];
        }
        const descriptorInfo = __getPropertyDescriptor(target, prop);
        if (descriptorInfo && descriptorInfo.dynamic) return target[prop];
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
        const descriptorInfo = __getPropertyDescriptor(target, prop);
        if (descriptorInfo && descriptorInfo.dynamic) {
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

  _getInstanceMethodProxy(beanFullName, beanInstance, prop, methodType) {
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

  _prepareAopChains(beanFullName, beanInstance) {
    const self = this;
    // beanFullName maybe class
    const beanOptions = appResource.getBean(beanFullName);
    const host = beanOptions || beanFullName;
    if (host.__aopChains__) return host.__aopChains__;
    // chains
    const chains: MetadataKey[] = [];
    if (beanOptions) {
      for (const key in self.app.meta.aops) {
        const aop = self.app.meta.aops[key];
        // not self
        if (key === beanOptions.beanFullName) continue;
        // check if match aop
        if (beanOptions.aop && !aop.matchAop) continue;
        // match
        if (__aopMatch(aop.match, beanOptions.beanFullName)) {
          chains.push(key);
        }
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

  _getAopChains(beanFullName) {
    // beanFullName maybe class
    const beanOptions = appResource.getBean(beanFullName);
    const host = beanOptions || beanFullName;
    return host.__aopChains__;
  }

  _getAopChainsProp(beanFullName, methodName, methodNameMagic) {
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

  __composeForPropAdapter = (context, chain) => {
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

  __composeForProp(chains) {
    return this.app.meta.util.compose(chains, this.__composeForPropAdapter);
  }

  __composeForPropAsync(chains) {
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

function __getPropertyDescriptor(obj, prop) {
  // dynamic
  const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (descriptor) return { descriptor, dynamic: true };
  // static
  return __getPropertyDescriptorStatic(obj, prop);
}

function __getPropertyDescriptorStatic(obj, prop) {
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
    if (descriptor) return { descriptor, dynamic: false };
    proto = Object.getPrototypeOf(proto);
  }
  return null;
}

function __aopMatch(match, beanFullName) {
  if (!Array.isArray(match)) {
    return (typeof match === 'string' && match === beanFullName) || (is.regExp(match) && match.test(beanFullName));
  }
  return match.some(item => __aopMatch(item, beanFullName));
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
