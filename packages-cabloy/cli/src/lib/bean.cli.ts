import { CmdContext } from '../types/argv.js';

let __commandsMap;
let __commandsAll;

export class BeanCli {
  async meta({ context }: { context: CmdContext }) {
    // command
    const { argv } = context;
    const cliFullName = argv.cliFullName;
    const { command, BeanClass } = await this._findCliCommand({ cliFullName });
    // command bean
    const beanCommand = new BeanClass({ command, context });
    if (!beanCommand) throw new Error(`cli command bean not found: ${command.beanFullName}`);
    // meta
    return await beanCommand.meta();
  }

  async execute({ context }: { context: CmdContext }) {
    // command
    const { argv } = context;
    const cliFullName = argv.cliFullName;
    const { command, BeanClass } = await this._findCliCommand({ cliFullName });
    // command bean
    const beanCommand = new BeanClass({ command, context });
    if (!beanCommand) throw new Error(`cli command bean not found: ${command.beanFullName}`);
    // execute
    await beanCommand.execute();
  }

  _findCliCommand({ cliFullName }: { cliFullName: string }) {
    if (!__commandsMap) {
      this._collectCommands();
    }
    const command = __commandsMap[cliFullName];
    if (!command) throw new Error(`cli command not found: ${cliFullName}`);
    return command;
  }

  _commandsAll() {
    return __commandsAll;
  }
}
