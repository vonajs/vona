import fs from 'fs';
import path from 'path';
import extend from '@cabloy/extend';
import { CabloyApplication, IModule } from '../../types/index.js';
import * as localeutil from '@cabloy/localeutil';

export default function (app: CabloyApplication, modules: Record<string, IModule>) {
  // all locales
  const ebLocales = {};

  // load locales
  loadLocales();

  // patch service
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
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
          if (!locale) locale = ebLocales[language] = {};
          extend(false, locale, locales[language]);
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
    const localeDirs = (<any>app.config.i18n).dirs;
    for (let i = 0; i < localeDirs.length; i++) {
      const dir = localeDirs[i];

      if (!fs.existsSync(dir)) {
        continue;
      }

      const names = fs.readdirSync(dir);
      for (let j = 0; j < names.length; j++) {
        const name = names[j];
        if (path.extname(name) !== '.js') continue;
        const filepath = path.join(dir, name);
        // support en_US.js => en-US.js
        const key = formatLocale(name.split('.')[0]);
        const resource = require(filepath);

        let locale = ebLocales[key];
        if (!locale) locale = ebLocales[key] = {};
        extend(false, locale, resource);
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
    if (!key) return null;

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

function formatLocale(locale) {
  // support zh_CN, en_US => zh-CN, en-US
  return locale.replace('_', '-').toLowerCase();
}
