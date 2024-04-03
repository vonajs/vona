import { Bean, BeanBase } from '@cabloy/core';
import chalk from 'chalk';

@Bean({ scene: 'startup' })
export class StartupOutputHomeRoute extends BeanBase {
  async execute() {
    const url = this.ctx.bean.base.getAbsoluteUrl(`/api/a/home/hello`);
    console.log(chalk.cyan(`  ${url}`));
  }
}
