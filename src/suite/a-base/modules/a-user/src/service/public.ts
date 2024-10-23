import { BeanBase, Service } from 'vona';

@Service()
export class ServicePublic extends BeanBase {
  async profile({ userId }: any) {
    const item = await this.ctx.bean.user.get({ id: userId });
    if (!item) return;
    const user = {
      userName: item.userName,
      avatar: item.avatar,
      motto: item.motto,
    };
    return { user };
  }
}
