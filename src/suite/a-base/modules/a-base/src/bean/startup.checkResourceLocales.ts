import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'startup' })
export class StartupCheckResourceLocales extends BeanBase {
  async execute() {
    await this.ctx.bean.resource.checkLocales();
  }
}
