import { BeanBase } from '@cabloy/core';

export class VersionInit extends BeanBase {
  async run() {
    // need not
    // // init roleRight actions
    // await this.ctx.bean.atomAction.init({
    //   atomClass: { module: 'a-base', atomClassName: 'roleRight' },
    //   actions: 'create,read,write,delete,clone,deleteBulk',
    // });
  }
}
