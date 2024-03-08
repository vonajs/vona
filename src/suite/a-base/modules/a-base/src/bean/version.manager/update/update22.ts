import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    await this.ctx.bean.model.builder('aAtom').update({ atomFlowId: 0 }).whereIn('atomStage', [1, 2]);
  }
}
