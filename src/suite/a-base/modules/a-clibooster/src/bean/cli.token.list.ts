import { BeanTemp } from 'vona-module-a-bean';

import { BeanCliBase } from 'vona-module-a-cli';

@BeanTemp({ scene: 'cli.token' })
export class CliTokenList extends BeanCliBase {
  get localToken() {
    return this.bean.scope('a-authopen').service.token;
  }

  async execute({ user }: any) {
    // super
    await super.execute({ user });
    // add
    const { fileName, config } = await this.localToken.list({
      log: false,
    });
    // tokens
    if (!config.tokens) config.tokens = {};
    const table = this.helper.newTable({
      head: ['Token Name', 'Host'],
      colWidths: [30, 50],
    });
    for (const tokenName in config.tokens) {
      const token = config.tokens[tokenName];
      table.push([tokenName, token.host]);
    }
    await this.console.log({ text: table.toString() });
    // fileName
    const text = this.helper.chalk.cyan(`\n  ${fileName}\n`);
    await this.console.log({ text });
  }
}
