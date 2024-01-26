import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'stats' })
export class StatsLabels extends BeanBase {
  async execute(context) {
    const { user } = context;
    // root stats
    const statsRoot = {
      red: 0,
      orange: 0,
    };
    // userLabels
    const userLabels = await this.ctx.bean.atom.getLabels({ user });
    for (const labelId of Object.keys(userLabels)) {
      const userLabel = userLabels[labelId];
      // sub
      const count = await this.ctx.bean.atom.count({
        options: {
          label: labelId,
        },
        user,
      });
      await this.ctx.bean.stats._set({
        module: ,
        name: 'labels',
        fullName: `labels.${labelId}`,
        value: count,
        user,
      });
      // root
      if (userLabel.color === 'red') {
        statsRoot.red += count;
      } else if (userLabel.color === 'orange') {
        statsRoot.orange += count;
      }
    }
    // ok
    return statsRoot;
  }
}
