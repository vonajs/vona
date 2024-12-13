import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceBase extends BeanBase {
  modules() {
    return this.app.bean.base.modules();
  }

  locales() {
    return this.app.bean.base.locales();
  }

  resourceTypes() {
    return this.app.bean.base.resourceTypes();
  }

  // id, module, atomClassName
  async getAtomClassBase({ atomClass }: any) {
    atomClass = await this.app.bean.atomClass.get(atomClass);
    const atomClassBase = this.app.bean.base.atomClass(atomClass);
    return {
      atomClass,
      atomClassBase,
    };
  }

  getActionsBase({ atomClass }: any) {
    return this.app.bean.base.actionsBase({ module: atomClass.module, atomClassName: atomClass.atomClassName });
  }

  atomClasses() {
    return this.app.bean.base.atomClasses();
  }

  actions() {
    return this.app.bean.base.actions();
  }

  themes() {
    return this.app.bean.base.themes();
  }
}
