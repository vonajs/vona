import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastReload extends BeanBase {
  async execute() {
    await this.ctx.bean.instance.instanceStartup({
      subdomain: this.ctx.subdomain,
      options: {
        force: true,
        instanceBase: null,
      },
    });
  }
}
