import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'event' })
export class EventLoginInfo extends BeanBase {
  async execute(context, next) {
    const data = context.data;
    const info = data.info;
    const provider = info.user && info.user.provider;
    if (provider && provider.module === 'a-authgithub' && provider.providerName === 'authgithub') {
      info.config = this.ctx.bean.util.extend(info.config, {
        modules: {},
      });
    }
    // next
    await next();
  }
}
