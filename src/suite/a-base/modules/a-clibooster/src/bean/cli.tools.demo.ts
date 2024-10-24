import { ScopeModule } from '../.metadata/this.js';
import { Bean } from 'vona';
import { BeanCliBase } from 'vona-module-a-cli';

@Bean({ scene: 'cli.tools' })
export class CliToolsDemo extends BeanCliBase<ScopeModule> {
  get localUtils() {
    return this.scope.service.utils;
  }

  async execute({ user }: any) {
    const { argv } = this.context;
    // super
    await super.execute({ user });
    // check env
    if (!this.ctx.app.meta.isLocal) this.ctx.throw(403);
    // methods
    let methods = argv._;
    if (methods.length === 0) {
      methods = ['execute']; // default method
    }
    // loop
    for (const method of methods) {
      // log
      const log = this.helper.chalk.keyword('yellow')(`\n=== method: ${method} ===\n`);
      await this.console.log(log);
      // execute
      const res = await this.localUtils.demoExecute({ method, argv, cli: this, user });
      // log
      await this.console.log(`===> time begin : ${res.timeBegin}`);
      await this.console.log(`===> time end   : ${res.timeEnd}`);
      await this.console.log(`===> duration   : ${res.duration}ms`);
      await this.console.log('===> result     :');
      await this.console.log({ text: JSON.stringify(res.result, null, 2) });
    }
  }
}
