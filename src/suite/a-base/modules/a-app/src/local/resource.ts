import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalResource extends BeanBase {
  async read({ atomStaticKey, options, user: _user }: any) {
    // donot check user access right, but must check atomClass
    const appItem = await this.ctx.bean.resource.readByStaticKey({ atomStaticKey, options /* , user*/ });
    if (appItem.module !== 'a-app' || appItem.atomClassName !== 'app') this.ctx.throw(403);
    return appItem;
  }
}
