import fs from 'fs';
import path from 'path';
import { VonaApplication, TypeModuleResourceLocales } from '../../types/index.js';
import * as localeutil from '@cabloy/localeutil';
import { IModule } from '@cabloy/module-info';
import localesDefault from '../core/locales.js';

export default function (app: VonaApplication, modules: Record<string, IModule>) {
  // all locales
  app.meta.locales = localesDefault;
  app.meta.localeModules = {};

  // load locales
  loadLocales();

  // patch service
  patchCreateContext();

  function patchCreateContext() {
    // ctx
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      // system
      const __getLocale = context.__getLocale;
      context.__getLocale = function () {
        if (context.__locale) {
          return context.__locale;
        }
        let locale = __getLocale.call(context);
        const locale2 = _parseTokenSafe(locale);
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
    /**
     * based on egg-i18n
     *
     * https://github.com/eggjs/egg-i18n/blob/master/app.js
     *
     */
    // project locales
    const localeDirs = [path.join(app.options.baseDir, 'config/locale')];
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
        const locale = localeutil.formatLocale(name.split('.')[0]);
        const resource = require(filepath);
        _initLocales(locale, resource.default ? resource.default : resource);
      }
    }

    // module locales
    for (const moduleName in modules) {
      const module = modules[moduleName];
      _registerLocales(moduleName, module.resource.locales);
    }
  }

  function _initLocales(locale, locales) {
    if (!locales) return;
    if (!locales.modules) {
      // override
      app.meta.locales[locale] = Object.assign({}, app.meta.locales[locale], locales);
    } else {
      const moduleMap = locales.modules;
      for (const moduleName in moduleMap) {
        _registerLocale(moduleName, locale, moduleMap[moduleName]);
      }
    }
  }

  function _registerLocales(moduleName: string, locales: TypeModuleResourceLocales) {
    if (!locales) return;
    for (const locale in locales) {
      _registerLocale(moduleName, locale, locales[locale]);
    }
  }

  function _registerLocale(moduleName: string, locale: string, moduleLocales: object) {
    // locales: not override
    app.meta.locales[locale] = Object.assign({}, moduleLocales, app.meta.locales[locale]);
    // localeModules
    if (!app.meta.localeModules[moduleName]) app.meta.localeModules[moduleName] = {};
    app.meta.localeModules[moduleName][locale] = Object.assign(
      {},
      moduleLocales,
      app.meta.localeModules[moduleName][locale],
    );
  }

  function _parseTokenSafe(token?: string) {
    if (!token) return token;
    return token.replace(/[\\\.*#%'"`;, ]/g, '');
  }
}
