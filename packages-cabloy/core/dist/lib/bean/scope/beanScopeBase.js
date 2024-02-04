"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeanScopeBase = void 0;
const beanScopeBean_js_1 = require("./beanScopeBean.js");
const beanScopeScene_js_1 = require("./beanScopeScene.js");
const beanBase_js_1 = require("../beanBase.js");
const beanScopeError_js_1 = require("../resource/error/beanScopeError.js");
const beanScopeLocale_js_1 = require("../resource/locale/beanScopeLocale.js");
const BeanModuleError = Symbol('BeanScopeBase#BeanModuleError');
const BeanModuleLocale = Symbol('BeanScopeBase#BeanModuleLocale');
const BeanModuleConfig = Symbol('BeanScopeBase#BeanModuleConfig');
const BeanModuleConstant = Symbol('BeanScopeBase#BeanModuleConstant');
const BeanModuleBean = Symbol('BeanScopeBase#BeanModuleBean');
class BeanScopeBase extends beanBase_js_1.BeanBase {
    constructor() {
        super(...arguments);
        this.__scenes = {};
    }
    get module() {
        return this.app.meta.modules[this.moduleBelong];
    }
    __get__(prop) {
        const moduleBelong = this.moduleBelong;
        // error
        if (prop === 'error') {
            if (!this[BeanModuleError]) {
                this[BeanModuleError] = this.bean._newBean(beanScopeError_js_1.BeanScopeError, moduleBelong);
            }
            return this[BeanModuleError];
        }
        // locale
        if (prop === 'locale') {
            if (!this[BeanModuleLocale]) {
                this[BeanModuleLocale] = this.bean._newBean(beanScopeLocale_js_1.BeanScopeLocale, moduleBelong);
            }
            return this[BeanModuleLocale];
        }
        // config
        if (prop === 'config') {
            if (!this[BeanModuleConfig]) {
                this[BeanModuleConfig] = this.ctx.config.module(moduleBelong);
            }
            return this[BeanModuleConfig];
        }
        // constant
        if (prop === 'constant') {
            if (!this[BeanModuleConstant]) {
                this[BeanModuleConstant] = this.ctx.constant.module(moduleBelong);
            }
            return this[BeanModuleConstant];
        }
        // _bean
        if (prop === '_bean') {
            if (!this[BeanModuleBean]) {
                this[BeanModuleBean] = this.bean._newBean(beanScopeBean_js_1.BeanScopeBean, moduleBelong);
            }
            return this[BeanModuleBean];
        }
        // scene
        if (!this.__scenes[prop]) {
            this.__scenes[prop] = this.bean._newBean(beanScopeScene_js_1.BeanScopeScene, moduleBelong, prop);
        }
        return this.__scenes[prop];
    }
}
exports.BeanScopeBase = BeanScopeBase;
//# sourceMappingURL=beanScopeBase.js.map