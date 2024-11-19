import { BeanBase, Service } from 'vona';

@Service()
export class ServiceShare extends BeanBase {
  async generate({ host, atomId, url, user }: any) {
    return await this.app.bean.share.generate({ host, atomId, url, user });
  }

  async shareGo({ uuid, user }: any) {
    return await this.app.bean.share.shareGo({ uuid, user });
  }
}
