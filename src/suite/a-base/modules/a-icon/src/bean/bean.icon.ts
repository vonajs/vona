import { Bean } from 'vona-module-a-bean';
import { BeanModuleScopeBase } from 'vona';

let __icons = null;

@Bean()
export class BeanIcon extends BeanModuleScopeBase {
  getIcons() {
    if (!__icons) {
      __icons = this._prepareIcons();
    }
    return __icons;
  }

  _prepareIcons() {
    const icons: any = {};
    for (const relativeName in this.ctx.app.meta.modules) {
      const module = this.ctx.app.meta.modules[relativeName];
      const groups = this.app.bean.util.getProperty(module.meta, 'icon.groups');
      if (groups) {
        icons[relativeName] = groups;
      }
    }
    return icons;
  }
}
