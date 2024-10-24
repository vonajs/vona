import { __ThisModule__ } from '../.metadata/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'stats' })
export class StatsTasksInstance extends BeanBase {
  async execute(context) {
    const { keys } = context;
    const fullName = keys.join('.');
    const valueOld = await this.ctx.bean.stats._get({
      module: __ThisModule__,
      fullName,
    });
    if (valueOld === undefined) return 1;
    return valueOld + 1;
  }
}
