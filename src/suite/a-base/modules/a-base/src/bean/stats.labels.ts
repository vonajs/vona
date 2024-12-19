import { BeanTemp } from 'vona-module-a-bean';
import { BigNumber } from 'bignumber.js';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'stats' })
export class StatsLabels extends BeanBase {
  async execute(context) {
    const { user } = context;
    // root stats
    const statsRoot = {
      red: BigNumber(0),
      orange: BigNumber(0),
    };
    // userLabels
    const userLabels = await this.app.bean.atom.getLabels({ user });
    for (const labelId of Object.keys(userLabels)) {
      const userLabel = userLabels[labelId];
      // sub
      const count = await this.app.bean.atom.count({
        options: {
          label: parseInt(labelId),
        },
        user,
      });
      await this.app.bean.stats._set({
        module: __ThisModule__,
        name: 'labels',
        fullName: `labels.${labelId}`,
        value: count,
        user,
      });
      // root
      if (userLabel.color === 'red') {
        statsRoot.red = statsRoot.red.plus(count);
      } else if (userLabel.color === 'orange') {
        statsRoot.orange = statsRoot.orange.plus(count);
      }
    }
    // ok
    return statsRoot;
  }
}
