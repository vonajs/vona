import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServicePublic extends BeanBase {
  async profile({ userId }: any) {
    const item = await this.app.bean.user.get({ id: userId });
    if (!item) return;
    const user = {
      userName: item.userName,
      avatar: item.avatar,
      motto: item.motto,
    };
    return { user };
  }
}
