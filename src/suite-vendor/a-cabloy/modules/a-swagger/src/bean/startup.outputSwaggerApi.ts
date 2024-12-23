import chalk from 'chalk';
import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';
import { apiPath } from 'vona-module-a-web';

@Startup({ debounce: true, after: true, meta: { mode: 'local' } })
export class StartupOutputSwaggerApi extends BeanBase implements IStartupExecute {
  async execute() {
    // apiPath
    const _apiPath = this.scope.util.combineApiPath(apiPath('//swagger'));
    // host
    const host = `http://localhost:${process.env.SERVER_LISTEN_PORT}${_apiPath}`;
    setTimeout(() => {
      console.log(chalk.yellow('\n=== swagger api ==='));
      console.log(chalk.cyan('> ' + host));
    }, 2000);
  }
}
