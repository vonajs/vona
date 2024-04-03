import { Bean, BeanBase } from '@cabloy/core';
import chalk from 'chalk';

@Bean({ scene: 'startup' })
export class StartupOutputHomeRoute extends BeanBase {
  async execute() {
    const moduleHome = this.app.meta.modules['a-home'];
    if (!moduleHome) return;
    const route = moduleHome.resource.routes.find(item => item.method === 'get');
    if (!route) return;
    const url = this.ctx.bean.base.getAbsoluteUrl(`/api/a/home/${route.path}`);
    setTimeout(() => {
      console.log(chalk.yellow('\n=== a-home route ==='));
      console.log(chalk.cyan('> ' + url));
    }, 2000);
  }
}
