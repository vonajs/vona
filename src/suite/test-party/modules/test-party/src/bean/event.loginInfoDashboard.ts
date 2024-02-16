import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'event' })
export class EventLoginInfoDashboard extends BeanBase {
  async execute(context, next) {
    const data = context.data;
    const info = data.info;
    info.config = this.ctx.bean.util.extend(info.config, {
      modules: {},
    });
    // next
    await next();
  }
}
