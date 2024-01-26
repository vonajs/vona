import { BeanBase, Local } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

@Local()
export class LocalTools extends BeanBase {
  get localUtils() {
    return this.ctx.bean.local.module(__ThisModule__).utils;
  }

  async demo({ method, query }) {
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
    return await this.localUtils.demoExecute({ method, argv, cli });
  }
}
