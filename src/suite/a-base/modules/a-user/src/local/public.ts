import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalPublic extends BeanBase {
  async profile({ userId }: any) {
    const item = await this.ctx.bean.user.get({ id: userId });
    const user = {
      userName: item.userName,
      avatar: item.avatar,
      motto: item.motto,
    };
    return { user };
  }
}
