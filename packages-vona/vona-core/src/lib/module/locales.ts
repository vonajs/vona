import type { IModule } from '@cabloy/module-info';
import type { TypeModuleResourceLocales } from '../../types/index.ts';
import type { VonaApplication } from '../core/application.ts';
import localesDefault from '../core/locales.ts';

export default function (app: VonaApplication, modules: Record<string, IModule>) {
  // all locales
  app.meta.locales = localesDefault;
  app.meta.localeModules = {};

  // load locales
  loadLocales();

  function loadLocales() {
    // project locales
    for (const locale in app.options.locales) {
      _initLocales(locale, app.options.locales[locale]);
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
}
