import is from 'is-type-of';
import ProxyMagic from './proxyMagic.js';
import { CabloyApplication, CabloyContext, IBeanRecord, TypeBeanRecord } from '../../../type/index.js';

export class BeanContainer {
  app: CabloyApplication;
  ctx: CabloyContext;

  constructor(app: CabloyApplication, ctx: CabloyContext) {
    this.app = app;
    this.ctx = ctx;
  }

  _register(moduleName, beanName, beanClass) {
    const beanFullName = beanClass.global
      ? beanName
      : `${typeof moduleName === 'string' ? moduleName : moduleName.relativeName}.${beanName}`;
    this.app.meta.beans[beanFullName] = beanClass;
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

  _getBeanClass(beanFullName) {
    if (is.class(beanFullName)) return beanFullName;
    // need not support object mode
    return this.app.meta.beans[beanFullName];
  }

  _getBean<T extends IBeanRecord, K extends keyof T>(beanFullName: K): T[K];
  _getBean(beanFullName: string);
  _getBean(beanFullName: string) {
    if (this[beanFullName] === undefined) {
      this[beanFullName] = this._newBean(beanFullName);
    }
    return this[beanFullName];
  }

  _newBean<T>(A: new (...args) => T, ...args): T;
  _newBean<T extends IBeanRecord, K extends keyof T>(beanFullName: K, ...args): T[K];
  _newBean(beanFullName: string, ...args);
  _newBean(beanFullName: (new (...args) => any) | string, ...args) {
    // class
    if (is.class(beanFullName)) {
      const beanInstance = new (<any>beanFullName)(...args);
      return this._patchBeanInstance(beanInstance, args, beanFullName, false);
    }
    // string
    const _beanClass = this._getBeanClass(beanFullName);
    if (!_beanClass) {
      // throw new Error(`bean not found: ${beanFullName}`);
      return null;
    }
    // instance
    const beanInstance = new _beanClass.bean(...args);
    // patch
    return this._patchBeanInstance(beanInstance, args, beanFullName, _beanClass.aop);
  }

  _patchBeanInstance(beanInstance, args, beanFullName, isAop) {
    if (this.app) {
      beanInstance.app = this.app;
    }
    if (this.ctx) {
      beanInstance.ctx = this.ctx;
    }
    if (beanInstance.__init__) {
      beanInstance.__init__(...args);
    }
    // __beanFullName__
    if (!is.class(beanFullName)) {
      beanInstance.__beanFullName__ = beanFullName;
    }
    // not aop on aop
    if (isAop) return beanInstance;
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
    const _beanClass = this._getBeanClass(beanFullName);
    if (_beanClass.__aopChains__) return _beanClass.__aopChains__;
    // chains
    const chains = [] as any[];
    if (!is.class(beanFullName)) {
      for (const key in self.app.meta.aops) {
        const aop = self.app.meta.aops[key];
        // not self
        if (key === beanFullName) continue;
        // check if match aop
        if (_beanClass.aop && !aop.matchAop) continue;
        // match
        if (__aopMatch(aop.match, beanFullName)) {
          chains.push(key);
        }
      }
    }
    // magic self
    if (__hasMagicMothod(beanInstance)) {
      chains.push(ProxyMagic);
    }
    // hold
    __setPropertyValue(_beanClass, '__aopChains__', chains);
    return chains;
  }

  _getAopChains(beanFullName) {
    // beanFullName maybe class
    const _beanClass = this._getBeanClass(beanFullName);
    return _beanClass.__aopChains__;
  }

  _getAopChainsProp(beanFullName, methodName, methodNameMagic) {
    const chainsKey = `__aopChains_${methodName}__`;
    const _beanClass = this._getBeanClass(beanFullName);
    if (_beanClass[chainsKey]) return _beanClass[chainsKey];
    const _aopChains = this._getAopChains(beanFullName);
    const chains = [] as any[];
    for (const key of _aopChains) {
      if (key === ProxyMagic) {
        chains.push(ProxyMagic);
      } else {
        const aop = this._getBean(key);
        if (aop[methodName]) {
          chains.push([key, methodName]);
        } else if (methodNameMagic && aop[methodNameMagic]) {
          chains.push([key, methodNameMagic]);
        }
      }
    }
    __setPropertyValue(_beanClass, chainsKey, chains);
    return chains;
  }

  __composeForPropAdapter = (context, chain) => {
    // ProxyMagic
    if (chain === ProxyMagic) return null;
    // chain
    const [key, methodName] = chain;
    const aop = this._getBean(key);
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
      if (obj[prop]) return obj[prop];
      if (typeof prop === 'symbol') return obj[prop];
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
