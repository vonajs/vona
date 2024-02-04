"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const extend_1 = __importDefault(require("@cabloy/extend"));
const localeutil = __importStar(require("@cabloy/localeutil"));
function default_1(app, modules) {
    // all locales
    const ebLocales = {};
    // load locales
    loadLocales();
    // patch service
    patchCreateContext();
    function patchCreateContext() {
        const createContext = app.createContext;
        app.createContext = (...args) => {
            const context = createContext.call(app, ...args);
            // maybe /favicon.ico
            if (context.module) {
                const defaultLocale = app.config.i18n.defaultLocale;
                context.text = function (...args) {
                    return getText(context.locale || defaultLocale, ...args);
                };
                context.text.locale = function (locale, ...args) {
                    return getText(locale || defaultLocale, ...args);
                };
            }
            const __getLocale = context.__getLocale;
            context.__getLocale = function () {
                if (context.__locale) {
                    return context.__locale;
                }
                let locale = __getLocale.call(context);
                const locale2 = context.bean.util.parseTokenSafe(locale);
                if (locale !== locale2) {
                    locale = locale2;
                    context.__setLocale(locale);
                }
                return locale;
            };
            return context;
        };
    }
    function loadLocales() {
        // module locales
        for (const key in modules) {
            const module = modules[key];
            const locales = module.resource.locales;
            if (locales) {
                for (const language in locales) {
                    let locale = ebLocales[language];
                    if (!locale)
                        locale = ebLocales[language] = {};
                    (0, extend_1.default)(false, locale, locales[language]);
                }
            }
        }
        /**
         * based on egg-i18n
         *
         * https://github.com/eggjs/egg-i18n/blob/master/app.js
         *
         */
        // project locales
        const localeDirs = app.config.i18n.dirs;
        for (let i = 0; i < localeDirs.length; i++) {
            const dir = localeDirs[i];
            if (!fs_1.default.existsSync(dir)) {
                continue;
            }
            const names = fs_1.default.readdirSync(dir);
            for (let j = 0; j < names.length; j++) {
                const name = names[j];
                if (path_1.default.extname(name) !== '.js')
                    continue;
                const filepath = path_1.default.join(dir, name);
                // support en_US.js => en-US.js
                const key = formatLocale(name.split('.')[0]);
                const resource = require(filepath);
                let locale = ebLocales[key];
                if (!locale)
                    locale = ebLocales[key] = {};
                (0, extend_1.default)(false, locale, resource);
            }
        }
    }
    /**
     * based on koa-locales
     *
     * https://github.com/koajs/locales/blob/master/index.js
     *
     */
    function getText(locale, ...args) {
        const key = args[0];
        if (!key)
            return null;
        // try locale
        let resource = ebLocales[locale] || {};
        let text = resource[key];
        if (text === undefined && locale !== 'en-us') {
            // try en-us
            resource = ebLocales['en-us'] || {};
            text = resource[key];
        }
        // equal key
        if (text === undefined) {
            text = key;
        }
        // format
        args[0] = text;
        return localeutil.getText(...args);
    }
}
exports.default = default_1;
function formatLocale(locale) {
    // support zh_CN, en_US => zh-CN, en-US
    return locale.replace('_', '-').toLowerCase();
}
//# sourceMappingURL=locales.js.map