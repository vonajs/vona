import { BeanModuleScopeBase, cast } from 'vona';
import { BeanDetail } from '../bean.detail.js';

export class BeanDetail0 extends BeanModuleScopeBase {
  protected get self() {
    return cast<BeanDetail>(this);
  }

  get modelDetailBase() {
    return this.self.scope.model.detailBase;
  }

  async _loopDetailClasses({ atomClass, fn }: any) {
    // all details of atom
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    const atomClassDetails = atomClassBase.details;
    if (!atomClassDetails) return; // do nothing
    // loop
    for (let atomClassDetail of atomClassDetails) {
      atomClassDetail = await this.app.bean.atomClass.get(atomClassDetail);
      const atomClassBaseDetail = await this.app.bean.atomClass.atomClass(atomClassDetail);
      await fn({ atomClassDetail, atomClassBaseDetail });
    }
  }
}
