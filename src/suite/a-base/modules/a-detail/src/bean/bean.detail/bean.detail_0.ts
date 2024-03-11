import { __ThisModule__ } from '../../resource/this.js';
import { BeanModuleScopeBase } from '@cabloy/core';

export class BeanDetail0 extends BeanModuleScopeBase {
  get modelDetailBase() {
    return this.scope.model.detailBase;
  }

  async _loopDetailClasses({ atomClass, fn }: any) {
    // all details of atom
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    const atomClassDetails = atomClassBase.details;
    if (!atomClassDetails) return; // do nothing
    // loop
    for (let atomClassDetail of atomClassDetails) {
      atomClassDetail = await this.ctx.bean.atomClass.get(atomClassDetail);
      const atomClassBaseDetail = await this.ctx.bean.atomClass.atomClass(atomClassDetail);
      await fn({ atomClassDetail, atomClassBaseDetail });
    }
  }
}
