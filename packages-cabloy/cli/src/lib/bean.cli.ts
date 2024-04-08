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

  _collectCommands() {
    const _commandsMap: any = {};
    const _commandsAll: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const moduleName = module.info.relativeName;
      const commands = module.meta && module.meta.cli && module.meta.cli.commands;
      if (!commands) continue;
      const _commandsModule = (_commandsAll[moduleName] = {});
      for (const groupName in commands) {
        const group = commands[groupName];
        const _commandsGroup = (_commandsModule[groupName] = {});
        for (const key in group) {
          const command = group[key];
          const fullKey = `${moduleName}:${groupName}:${key}`;
          // command
          const _command = this.ctx.bean.util.extend({}, command);
          // bean
          _command.beanFullName = this.bean.util.combineBeanFullName({
            module: moduleName,
            scene: 'cli',
            bean: command.bean,
          });
          // resource
          let atomStaticKey = _command.resource && _command.resource.atomStaticKey;
          if (!atomStaticKey) throw new Error(`cli command resource.atomStaticKey not specified: ${fullKey}`);
          if (atomStaticKey.indexOf(':') === -1) {
            atomStaticKey = `${moduleName}:${atomStaticKey}`;
          }
          _command.resource.atomStaticKey = atomStaticKey;
          // ok
          _commandsMap[fullKey] = _commandsGroup[key] = _command;
        }
      }
    }
    // ok
    __commandsMap = _commandsMap;
    __commandsAll = _commandsAll;
  }
}
