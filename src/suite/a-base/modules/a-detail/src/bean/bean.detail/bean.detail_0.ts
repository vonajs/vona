import { ScopeModule } from '../../.metadata/this.js';
import { BeanModuleScopeBase } from 'vona';

export class BeanDetail0 extends BeanModuleScopeBase<ScopeModule> {
  get modelDetailBase() {
    return this.scope.model.detailBase;
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
