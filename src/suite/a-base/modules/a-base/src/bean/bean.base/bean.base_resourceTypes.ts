import { BeanBaseModules } from './bean.base_modules.js';

const _resourceTypes: any = {};

export class BeanBaseResourceTypes extends BeanBaseModules {
  resourceTypes() {
    if (!_resourceTypes[this.ctx.locale]) {
      _resourceTypes[this.ctx.locale] = this._prepareResourceTypes();
    }
    return _resourceTypes[this.ctx.locale];
  }

  _prepareResourceTypes() {
    const resourceTypes: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const moduleName = module.info.relativeName;
      const resources = module.resource.meta && module.resource.meta.base && module.resource.meta.base.resources;
      if (!resources) continue;
      for (const key in resources) {
        const resource = resources[key];
        const fullKey = `${moduleName}:${key}`;
        resourceTypes[fullKey] = {
          ...resource,
          titleLocale: this.ctx.text(resource.title),
        };
      }
    }
    return resourceTypes;
  }
}
