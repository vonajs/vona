import { BeanBase, IStartupExecute, Startup } from 'vona';
import chalk from 'chalk';

@Startup({ debounce: true, after: true })
export class StartupOutputHomeRoute extends BeanBase implements IStartupExecute {
  async execute() {
    // only for local
    if (!this.ctx.app.meta.isLocal) return;
    const moduleHome = this.app.meta.modules['a-home'];
    if (!moduleHome) return;
    const route = moduleHome.resource.routes.find(item => item.method === 'get');
    if (!route) return;
    // host
    const host = `http://127.0.0.1:${process.env.SERVER_LISTEN_PORT}`;
    const url = `${host}/api/a/home/${route.path}`;
    setTimeout(() => {
      console.log(chalk.yellow('\n=== a-home route ==='));
      console.log(chalk.cyan('> ' + url));
    }, 2000);
  }
}
