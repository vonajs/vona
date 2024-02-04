"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appResource = exports.AppResource = exports.DecoratorUse = exports.DecoratorBeanFullName = void 0;
const is_type_of_1 = __importDefault(require("is-type-of"));
const metadata_js_1 = require("./metadata.js");
const beanSimple_js_1 = require("../bean/beanSimple.js");
exports.DecoratorBeanFullName = Symbol.for('Decorator#BeanFullName');
exports.DecoratorUse = Symbol.for('Decorator#Use');
class AppResource extends beanSimple_js_1.BeanSimple {
    constructor() {
        super(...arguments);
        this.beans = {};
        this.aops = {};
    }
    addUse(target, options) {
        const uses = metadata_js_1.appMetadata.getOwnMetadataMap(exports.DecoratorUse, target);
        uses[options.prop] = options;
        metadata_js_1.appMetadata.defineMetadata(exports.DecoratorUse, uses, target);
    }
    getUses(target) {
        return metadata_js_1.appMetadata.getOwnMetadataMap(exports.DecoratorUse, target);
    }
    addAop(options) {
        // bean
        const beanOptions = this.addBean(options);
        // aop
        this.aops[beanOptions.beanFullName] = beanOptions;
        // ok
        return beanOptions;
    }
    findAopsMatched(beanFullName) {
        // beanOptions
        const beanOptions = this.getBean(beanFullName);
        if (!beanOptions)
            return;
        // loop
        const aops = [];
        for (const key in this.aops) {
            const aop = this.aops[key];
            // not self
            if (key === beanOptions.beanFullName)
                continue;
            // // check if match aop
            // if (beanOptions.aop && !aop.matchAop) continue;
            // gate
            if (!this.app.meta.util.checkGate(aop.gate))
                continue;
            // match
            if (__aopMatch(aop.aopMatch, beanOptions.beanFullName)) {
                aops.push(key);
            }
        }
        return aops;
    }
    addBean(options) {
        let { module, scene, name, beanClass, virtual } = options;
        // name
        name = this._parseBeanName(beanClass, scene, name);
        // module
        if (!module)
            throw new Error(`module name not parsed for bean: ${scene}.${name}`);
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
        };
        beanOptions.__aopChains__ = null;
        beanOptions.__aopChainsKey__ = {};
        // record
        this.beans[beanOptions.beanFullName] = beanOptions;
        // set metadata
        metadata_js_1.appMetadata.defineMetadata(exports.DecoratorBeanFullName, beanFullName, beanOptions.beanClass);
        // ok
        return beanOptions;
    }
    getBeanFullName(A) {
        return metadata_js_1.appMetadata.getOwnMetadata(exports.DecoratorBeanFullName, A);
    }
    getBean(beanFullName) {
        let fullName;
        if (typeof beanFullName === 'function' && is_type_of_1.default.class(beanFullName)) {
            fullName = metadata_js_1.appMetadata.getOwnMetadata(exports.DecoratorBeanFullName, beanFullName);
        }
        else {
            fullName = beanFullName;
        }
        if (!fullName)
            return null;
        return this.beans[fullName];
    }
    _parseBeanName(beanClass, scene, name) {
        // name
        if (name)
            return name;
        // scene
        if (!scene)
            scene = 'bean';
        scene = scene.replace(/\./gi, '');
        // bean class name
        const beanClassName = beanClass.name;
        if (beanClassName.toLowerCase().startsWith(scene)) {
            name = beanClassName.substring(scene.length);
        }
        else {
            name = beanClassName;
        }
        // lowerCase
        name = name.charAt(0).toLowerCase() + name.substring(1);
        return name;
    }
    _parseModuleBelong(module, beanClass, virtual) {
        // not set when virtual
        if (virtual)
            return;
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
    _getModuleBelong(beanFullName) {
        const beanOptions = this.getBean(beanFullName);
        if (!beanOptions || !beanOptions.moduleBelong)
            throw new Error(`not found module belong: ${beanFullName}`);
        return beanOptions.moduleBelong;
    }
}
exports.AppResource = AppResource;
exports.appResource = new AppResource();
function __aopMatch(match, beanFullName) {
    if (!Array.isArray(match)) {
        return (typeof match === 'string' && match === beanFullName) || (is_type_of_1.default.regExp(match) && match.test(beanFullName));
    }
    return match.some(item => __aopMatch(item, beanFullName));
}
//# sourceMappingURL=resource.js.map