import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'stats' })
export class StatsStars extends BeanBase {
  async execute(context) {
    const { user } = context;
    const count = await this.app.bean.atom.count({
      options: {
        star: 1,
      },
      user,
    });
    return count;
  }
}
