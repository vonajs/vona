import chalk from 'chalk';
import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ debounce: true, after: true, meta: { mode: 'local' } })
export class StartupOutputHomeApi extends BeanBase implements IStartupExecute {
  async execute() {
    // host
    const host = `http://localhost:${process.env.SERVER_LISTEN_PORT}`;
    setTimeout(() => {
      console.log(chalk.yellow('\n=== home api ==='));
      console.log(chalk.cyan('> ' + host));
    }, 2000);
  }
}
