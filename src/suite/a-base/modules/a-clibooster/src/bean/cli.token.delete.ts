import { Bean } from 'vona';
import { BeanCliBase } from 'vona-module-a-cli';

@Bean({ scene: 'cli.token' })
export class CliTokenDelete extends BeanCliBase {
  get localToken() {
    return this.bean.scope('a-authopen').service.token;
  }

  async execute({ user }: any) {
    const { argv } = this.context;
    // super
    await super.execute({ user });
    // add
    const { fileName } = await this.localToken.delete({
      name: argv.name,
      log: false,
    });
    // chalk
    const text = this.helper.chalk.cyan(`\n  ${fileName}\n`);
    await this.console.log({ text });
  }
}
