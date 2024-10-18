import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'stats' })
export class StatsStarsLabels extends BeanBase {
  async execute(context) {
    const { user } = context;
    // stats
    let stats;
    // labels
    stats = await this.ctx.bean.stats._get({
      module: __ThisModule__,
      fullName: 'labels',
      user,
    });
    if (!stats) {
      stats = {
        red: 0,
        orange: 0,
      };
    }
    // stars
    const stars = await this.ctx.bean.stats._get({
      module: __ThisModule__,
      fullName: 'stars',
      user,
    });
    stats.gray = stars || 0;
    // ok
    return stats;
  }
}
