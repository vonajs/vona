import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aAtomActin: code:16 name: workflowFormal -> viewWorkflow
    await this.bean.model.builder('aAtomAction').update({ name: 'viewWorkflow' }).where({ code: 16 });
  }
}
