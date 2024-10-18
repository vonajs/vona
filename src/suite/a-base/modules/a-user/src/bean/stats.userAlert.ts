import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'stats' })
export class StatsUserAlert extends BeanBase {
  async execute(context) {
    const { user } = context;
    // user stats
    const statsUser = await this.ctx.bean.stats._get({
      module: __ThisModule__,
      fullName: 'user',
      user,
    });
    // message stats
    const statsMessage = await this.ctx.bean.stats._get({
      module: 'a-message',
      fullName: 'message',
      user,
    });
    // minus
    if (statsMessage) {
      if (statsMessage.red !== undefined) {
        statsUser.red -= statsMessage.red;
      }
      if (statsMessage.orange !== undefined) {
        statsUser.orange -= statsMessage.orange;
      }
    }
    // ok
    return statsUser;
  }
}
