import { BeanBase } from 'vona';

export class VersionInit extends BeanBase {
  async run() {
    // need not
    // // init roleRight actions
    // await this.app.bean.atomAction.init({
    //   atomClass: { module: 'a-base', atomClassName: 'roleRight' },
    //   actions: 'create,read,write,delete,clone,deleteBulk',
    // });
  }
}
