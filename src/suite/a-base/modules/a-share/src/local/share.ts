import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalShare extends BeanBase {
  async generate({ host, atomId, url, user }) {
    return await this.ctx.bean.share.generate({ host, atomId, url, user });
  }

  async shareGo({ uuid, user }) {
    return await this.ctx.bean.share.shareGo({ uuid, user });
  }
}
