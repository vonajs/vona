import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'stats' })
export class StatsUserAlert extends BeanBase {
  async execute(context) {
    const { user } = context;
    // user stats
    const statsUser = await this.app.bean.stats._get({
      module: __ThisModule__,
      fullName: 'user',
      user,
    });
    // message stats
    const statsMessage = await this.app.bean.stats._get({
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
