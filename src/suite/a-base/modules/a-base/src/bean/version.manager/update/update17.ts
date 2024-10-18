import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // aStatus
    await this.bean.model.builder('aStatus').whereILike('name', 'user-layoutConfig:%').delete();
  }
}
