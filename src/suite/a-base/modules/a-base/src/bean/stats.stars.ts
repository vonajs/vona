import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'stats' })
export class StatsStars extends BeanBase {
  async execute(context) {
    const { user } = context;
    const count = await this.ctx.bean.atom.count({
      options: {
        star: 1,
      },
      user,
    });
    return count;
  }
}
