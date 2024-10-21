import { BeanBaseAuthProviders } from './bean.base_authProviders.js';

const _localeModules: any = {};

export class BeanBaseLocaleModules extends BeanBaseAuthProviders {
  localeModules() {
    if (!_localeModules[this.ctx.locale]) {
      _localeModules[this.ctx.locale] = this._prepareLocaleModules();
    }
    return _localeModules[this.ctx.locale];
  }

  _prepareLocaleModules() {
    const localeModules: any[] = [];
    for (const module of this.ctx.app.meta.modulesArray) {
      const locale = module.package.vonaModule && module.package.vonaModule.locale;
      if (!locale) continue;
      const locales = locale.split(',');
      if (locales.findIndex(item => item === this.ctx.locale) > -1) {
        localeModules.push(module.info.relativeName);
      }
    }
    return localeModules;
  }
}
