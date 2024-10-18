import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'broadcast' })
export class BroadcastMailSceneChanged extends BeanBase {
  async execute(context) {
    const sameAsCaller = context.sameAsCaller;
    if (!sameAsCaller) {
      await this.ctx.bean.mailSceneCache._cacheMailScenesConfig();
    }
  }
}
