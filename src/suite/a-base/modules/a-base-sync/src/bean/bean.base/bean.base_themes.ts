import { BeanBaseResourceTypes } from './bean.base_resourceTypes.js';

const _themesLocales: any = {};

export class BeanBaseThemes extends BeanBaseResourceTypes {
  themes() {
    if (!_themesLocales[this.ctx.locale]) {
      _themesLocales[this.ctx.locale] = this._prepareThemes();
    }
    return _themesLocales[this.ctx.locale];
  }

  _prepareThemes() {
    const modules: any = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      if (module.package.eggBornModule && module.package.eggBornModule.theme) {
        const _module = {
          name: relativeName,
          title: module.package.title || module.info.name,
          description: this.ctx.text(module.package.description),
          info: module.info,
        };
        _module.titleLocale = this.ctx.text(_module.title);
        modules[relativeName] = _module;
      }
    }
    return modules;
  }
}
