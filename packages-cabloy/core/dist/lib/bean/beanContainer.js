"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanContainerCreate = exports.BeanContainer = void 0;
const is_type_of_1 = __importDefault(require("is-type-of"));
const resource_js_1 = require("../core/resource.js");
const beanBase_js_1 = require("./beanBase.js");
const beanSimple_js_1 = require("./beanSimple.js");
const ProxyMagic = Symbol.for('Bean#ProxyMagic');
const BeanContainerInstances = Symbol.for('Bean#Instances');
const BeanContainerInstancesModule = Symbol.for('Bean#InstancesModule');
// const BeanInstanceScope = Symbol('BeanInstance#Scope');
class BeanContainer {
    constructor(app, ctx) {
        this[_a] = {};
        this[_b] = {};
        this.__composeForPropAdapter = (_context, chain) => {
            const [aopKey, methodName] = chain;
            // ProxyMagic
            if (aopKey === ProxyMagic)
                return null;
            // chain
            const aop = this._getBean(aopKey);
            if (!aop)
                throw new Error(`aop not found: ${chain}`);
            if (!aop[methodName])
                return null;
            return {
                receiver: aop,
                fn: aop[methodName],
            };
        };
        this.app = app;
        this.ctx = ctx;
    }
    scope(moduleScope) {
        return this._getBean(`${moduleScope}.scope.module`);
    }
    _getBean(beanFullName) {
        // bean options
        const beanOptions = resource_js_1.appResource.getBean(beanFullName);
        if (!beanOptions) {
            // not found
            return null;
        }
        const fullName = beanOptions.beanFullName;
        if (this[BeanContainerInstances][fullName] === undefined) {
            this[BeanContainerInstances][fullName] = this._newBean(fullName);
        }
        return this[BeanContainerInstances][fullName];
    }
    _getBeanScope(beanFullName, moduleScope) {
        // bean options
        const beanOptions = resource_js_1.appResource.getBean(beanFullName);
        if (!beanOptions) {
            // not found
            return null;
        }
        const fullName = beanOptions.beanFullName;
        const key = `${fullName}#${moduleScope}`;
        if (this[BeanContainerInstancesModule][key] === undefined) {
            this[BeanContainerInstancesModule][key] = this._newBeanScope(fullName, moduleScope);
        }
        return this[BeanContainerInstancesModule][key];
    }
    _newBean(beanFullName, ...args) {
        // bean options
        const beanOptions = resource_js_1.appResource.getBean(beanFullName);
        if (!beanOptions) {
            // class
            if (typeof beanFullName === 'function' && is_type_of_1.default.class(beanFullName)) {
                const beanInstance = new beanFullName(...args);
                return this._patchBeanInstance(beanInstance, args, beanFullName, false);
            }
            // throw new Error(`bean not found: ${beanFullName}`);
            return null;
        }
        // instance
        const beanInstance = new beanOptions.beanClass(...args);
        // patch
        return this._patchBeanInstance(beanInstance, args, beanOptions.beanFullName, beanOptions.aop);
    }
    _newBeanScope(beanFullName, moduleScope, ...args) {
        return this._newBean(beanFullName, moduleScope, ...args);
    }
    _injectBeanInstance(beanInstance, beanFullName) {
        const beanOptions = resource_js_1.appResource.getBean(beanFullName);
        if (!beanOptions)
            return;
        const uses = resource_js_1.appResource.getUses(beanOptions.beanClass.prototype);
        for (const key in uses) {
            const useOptions = uses[key];
            const moduleScope = useOptions.moduleScope;
            const containerScope = useOptions.containerScope;
            this._injectBeanInstancePropLazy(beanInstance, useOptions.prop, useOptions.beanFullName, moduleScope, containerScope);
        }
    }
    _injectBeanInstancePropLazy(instance, prop, targetBeanFullName, moduleScope, containerScope) {
        const self = this;
        Object.defineProperty(instance, prop, {
            enumerable: true,
            configurable: true,
            get() {
                const symbol = Symbol.for(`__bean_use__#${prop}`);
                if (!instance[symbol]) {
                    instance[symbol] = self._injectBeanInstanceProp(targetBeanFullName, moduleScope, containerScope);
                }
                return instance[symbol];
            },
        });
    }
    _injectBeanInstanceProp(targetBeanFullName, moduleScope, containerScope) {
        // containerScope
        if (!containerScope) {
            const targetOptions = resource_js_1.appResource.getBean(targetBeanFullName);
            if (!targetOptions) {
                throw new Error(`not found bean class: ${targetBeanFullName}`);
            }
            containerScope = targetOptions.containerScope || 'ctx';
        }
        // targetInstance
        let targetInstance;
        if (moduleScope) {
            if (containerScope === 'app') {
                targetInstance = this.app.bean._getBeanScope(targetBeanFullName, moduleScope);
            }
            else if (containerScope === 'ctx') {
                targetInstance = this._getBeanScope(targetBeanFullName, moduleScope);
            }
            else if (containerScope === 'new') {
                targetInstance = this._newBeanScope(targetBeanFullName, moduleScope);
            }
        }
        else {
            if (containerScope === 'app') {
                targetInstance = this.app.bean._getBean(targetBeanFullName);
            }
            else if (containerScope === 'ctx') {
                targetInstance = this._getBean(targetBeanFullName);
            }
            else if (containerScope === 'new') {
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
    _patchBeanInstance(beanInstance, args, beanFullName, aop) {
        if (beanInstance instanceof beanSimple_js_1.BeanSimple) {
            // app
            beanInstance.app = this.app;
            // ctx: always set even if is null, so as to prevent magic method __get__ take effect.
            beanInstance.ctx = this.ctx;
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
        // not aop on aop
        if (aop)
            return beanInstance;
        // aop chains
        const _aopChains = this._prepareAopChains(beanFullName, beanInstance);
        // no aop
        if (_aopChains.length === 0)
            return beanInstance;
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
                // descriptorInfo
                const descriptorInfo = __getPropertyDescriptor(target, prop);
                if (!__checkAopOfDescriptorInfo(descriptorInfo))
                    return target[prop];
                const methodType = __methodTypeOfDescriptor(descriptorInfo);
                // get prop
                if (!methodType) {
                    const methodName = `__get_${prop}__`;
                    const methodNameMagic = '__get__';
                    const _aopChainsProp = self._getAopChainsProp(beanFullName, methodName, methodNameMagic);
                    if (_aopChainsProp.length === 0)
                        return target[prop];
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
                            }
                            else {
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
                    }
                    else {
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
        if (_aopChainsProp.length === 0)
            return beanInstance[prop];
        // proxy
        const methodProxyKey = `__aopproxy_method_${prop}__`;
        if (beanInstance[methodProxyKey])
            return beanInstance[methodProxyKey];
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
        // beanFullName maybe class
        const beanOptions = resource_js_1.appResource.getBean(beanFullName);
        const host = beanOptions || beanFullName;
        if (host.__aopChains__)
            return host.__aopChains__;
        // chains
        let chains = [];
        if (beanOptions && !beanOptions.aop) {
            const aops = resource_js_1.appResource.findAopsMatched(beanOptions.beanFullName);
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
    _getAopChains(beanFullName) {
        // beanFullName maybe class
        const beanOptions = resource_js_1.appResource.getBean(beanFullName);
        const host = beanOptions || beanFullName;
        return host.__aopChains__;
    }
    _getAopChainsProp(beanFullName, methodName, methodNameMagic) {
        const chainsKey = `__aopChains_${methodName}__`;
        const beanOptions = resource_js_1.appResource.getBean(beanFullName);
        const host = beanOptions || beanFullName;
        if (!host.__aopChainsKey__)
            host.__aopChainsKey__ = {};
        if (host.__aopChainsKey__[chainsKey])
            return host.__aopChainsKey__[chainsKey];
        const _aopChains = this._getAopChains(beanFullName);
        const chains = [];
        for (const aopKey of _aopChains) {
            if (aopKey === ProxyMagic) {
                chains.push([aopKey, methodName]);
            }
            else {
                const aop = this._getBean(aopKey);
                if (aop[methodName]) {
                    chains.push([aopKey, methodName]);
                }
                else if (methodNameMagic && aop[methodNameMagic]) {
                    chains.push([aopKey, methodNameMagic]);
                }
            }
        }
        host.__aopChainsKey__[chainsKey] = chains;
        return chains;
    }
    __composeForProp(chains) {
        return this.app.meta.util.compose(chains, this.__composeForPropAdapter);
    }
    __composeForPropAsync(chains) {
        return this.app.meta.util.composeAsync(chains, this.__composeForPropAdapter);
    }
}
exports.BeanContainer = BeanContainer;
_a = BeanContainerInstances, _b = BeanContainerInstancesModule;
function BeanContainerCreate(app, ctx) {
    const beanContainer = new BeanContainer(app, ctx);
    return new Proxy(beanContainer, {
        get(obj, prop) {
            if (typeof prop === 'symbol')
                return obj[prop];
            if (obj[prop])
                return obj[prop];
            return obj._getBean(prop);
        },
    });
}
exports.BeanContainerCreate = BeanContainerCreate;
function __checkAopOfDescriptorInfo(descriptorInfo) {
    if (!descriptorInfo)
        return true;
    return !descriptorInfo.dynamic && !descriptorInfo.ofBeanBase;
}
function __getPropertyDescriptor(obj, prop) {
    // dynamic
    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    if (descriptor)
        return { descriptor, dynamic: true };
    // static
    return __getPropertyDescriptorStatic(obj, prop);
}
function __getPropertyDescriptorStatic(obj, prop) {
    let proto = Object.getPrototypeOf(obj);
    let ofBeanBase = false;
    while (proto) {
        if (Object.getPrototypeOf(proto.constructor) === beanBase_js_1.BeanBase) {
            ofBeanBase = true;
        }
        const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
        if (descriptor)
            return { descriptor, dynamic: false, ofBeanBase };
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
    if (!descriptorInfo)
        return null;
    const { descriptor, dynamic } = descriptorInfo;
    if (dynamic)
        return null;
    if (descriptor.get)
        return null;
    const methodType = descriptor.value?.constructor?.name;
    if (['Function', 'AsyncFunction'].includes(methodType)) {
        return methodType;
    }
    return null;
}
//# sourceMappingURL=beanContainer.js.map