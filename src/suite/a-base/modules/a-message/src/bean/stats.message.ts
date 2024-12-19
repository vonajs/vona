import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';
import { BigNumber } from 'bignumber.js';

@BeanTemp({ scene: 'stats' })
export class StatsMessage extends BeanBase {
  async execute(context) {
    const { keys, user } = context;
    if (keys.length === 2) {
      // messageClass
      const [module, messageClassName] = keys[1].split('_');
      const messageClass = { module, messageClassName };
      const messageClassBase = this.app.bean.io.messageClass.messageClass(messageClass);
      // options
      const options = {
        where: {
          messageRead: 0,
        },
      };
      // count
      const res = await this.app.bean.io.message.count({ messageClass, options, user });
      const count = res.count;
      // stat
      const color = messageClassBase.info.uniform.stats.color;
      return { [color]: count };
    } else if (keys.length === 1) {
      // message
      const modelStats = this.$scope.stats.model.stats;
      const items = await modelStats.select({
        where: {
          module: __ThisModule__,
          name: {
            op: 'likeRight',
            val: 'message.',
          },
          userId: user.id,
        },
      });
      // count
      const stat = {
        red: BigNumber(0),
        gray: BigNumber(0),
      };
      for (const item of items) {
        // only level 2
        if (item.name.split('.').length !== 2) continue;
        const value = JSON.parse(item.value);
        if (value && value.red !== undefined) stat.red = stat.red.plus(value.red);
        if (value && value.gray !== undefined) stat.gray = stat.gray.plus(value.gray);
      }
      // ok
      return stat;
    }
  }
}
