const _modulesLocales = {};

// const moduleInfo = module.info;
module.exports = class Base {
  modules() {
    if (!_modulesLocales[this.ctx.locale]) {
      _modulesLocales[this.ctx.locale] = this._prepareModules();
    }
    return _modulesLocales[this.ctx.locale];
  }

  _prepareModules() {
    const modules = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      const _module = {
        name: relativeName,
        title: module.package.title || module.info.name,
        description: this.ctx.text(module.package.description),
        info: module.info,
      };
      const icon = module.package.eggBornModule && module.package.eggBornModule.icon;
      if (icon) {
        _module.icon = icon;
      }
      _module.titleLocale = this.ctx.text(_module.title);
      modules[relativeName] = _module;
    }
    return modules;
  }
};
