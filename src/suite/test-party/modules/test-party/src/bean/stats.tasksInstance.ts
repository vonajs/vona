import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'stats' })
export class StatsTasksInstance extends BeanBase {
  async execute(context) {
    const { keys } = context;
    const fullName = keys.join('.');
    const valueOld = await this.app.bean.stats._get({
      module: __ThisModule__,
      fullName,
    });
    if (valueOld === undefined) return 1;
    return valueOld + 1;
  }
}
