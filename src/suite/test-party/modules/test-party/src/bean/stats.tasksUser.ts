import { __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'stats' })
export class StatsTasksUser extends BeanBase {
  async execute(context) {
    const { keys, user } = context;
    const fullName = keys.join('.');
    const valueOld = await this.ctx.bean.stats._get({
      module: __ThisModule__,
      fullName,
      user,
    });
    if (valueOld === undefined) return 1;
    return valueOld + 1;
  }
}
