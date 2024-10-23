import { BeanBase, Local } from 'vona';

@Local()
export class LocalShare extends BeanBase {
  async generate({ host, atomId, url, user }: any) {
    return await this.ctx.bean.share.generate({ host, atomId, url, user });
  }

  async shareGo({ uuid, user }: any) {
    return await this.ctx.bean.share.shareGo({ uuid, user });
  }
}
