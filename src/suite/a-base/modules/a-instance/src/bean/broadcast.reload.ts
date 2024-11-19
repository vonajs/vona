import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastReload extends BeanBase {
  async execute() {
    await this.app.bean.instance.instanceStartup(this.ctx.subdomain, {
      force: true,
      configInstanceBase: undefined,
    });
  }
}
