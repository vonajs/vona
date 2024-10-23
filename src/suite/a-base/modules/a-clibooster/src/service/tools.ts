import { BeanBase, Local } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalTools extends BeanBase<ScopeModule> {
  get localUtils() {
    return this.scope.local.utils;
  }

  async demo({ method, query, user }: any) {
    // methods
    const methods: any[] = [];
    if (method) {
      methods.push(method);
    } else {
      method = 'execute';
    }
    // argv
    const argv = {
      _: methods,
      projectPath: process.cwd(),
      ...query,
    };
    // cli
    const cli = this.ctx.bean._newBean('cliBase', {
      command: null,
      context: { cwd: argv.projectPath },
      terminal: false,
    });
    // execute
    return await this.localUtils.demoExecute({ method, argv, cli, user });
  }
}
