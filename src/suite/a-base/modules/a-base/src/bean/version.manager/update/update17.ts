import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // aStatus
    await this.bean.model.builder('aStatus').whereILike('name', 'user-layoutConfig:%').delete();
  }
}
