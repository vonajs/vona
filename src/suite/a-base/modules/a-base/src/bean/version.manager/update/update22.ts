import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    await this.app.bean.model.builder('aAtom').update({ atomFlowId: 0 }).whereIn('atomStage', [1, 2]);
  }
}
