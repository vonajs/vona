import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

let __commandsMap;
let __commandsAll;

@Bean()
export class BeanCli extends BeanBase {
  async meta({ context, user }: any) {
    try {
      // reload freeze
      this.ctx.app.meta.reload.freeze();
      // command
      const { argv } = context;
      const cliFullName = argv.cliFullName;
      const command = await this._findCliCommandAndCheckRight({ cliFullName, user });
      // command bean
      const beanCommand = this.app.bean._newBean(command.beanFullName, { command, context });
      if (!beanCommand) throw new Error(`cli command bean not found: ${command.beanFullName}`);
      // meta
      return await beanCommand.meta({ user });
    } finally {
      // reload unfreeze
      this.ctx.app.meta.reload.unfreeze();
    }
  }

  async execute({ progressId, context, user }: any) {
    // directly
    if (!progressId) {
      await this._progressInBackground({ progressId, context, user });
      return null;
    }
    // create progress
    await this.app.bean.progress.create({ progressId });
    // background
    this.bean.executor.runInBackground(async () => {
      await this._progressInBackground({ progressId, context, user });
    });
    // return progressId
    return { progressId };
  }

  async _progressInBackground({ progressId, context, user }: any) {
    try {
      // reload freeze
      this.ctx.app.meta.reload.freeze();
      // command
      const { argv } = context;
      const cliFullName = argv.cliFullName;
      const command = await this._findCliCommandAndCheckRight({ cliFullName, user });
      // command bean
      const beanCommand = this.app.bean._newBean(command.beanFullName, { command, context, progressId });
      if (!beanCommand) throw new Error(`cli command bean not found: ${command.beanFullName}`);
      // execute
      await beanCommand.execute({ user });
      // progress done
      await this.app.bean.progress.done({ progressId, message: this.app.text('CliDone') });
    } catch (err: any) {
      // progress error
      const msg = err.message;
      let msgObject;
      if (msg && typeof msg === 'object') {
        msgObject = JSON.stringify(msg, null, 2);
      }
      let message;
      if (this.ctx.app.meta.isProd) {
        message = msgObject || msg;
      } else {
        if (msgObject) {
          message = [msgObject, err.stack].join('\n');
        } else {
          message = err.stack;
        }
      }
      await this.app.bean.progress.error({ progressId, message });
      // throw err
      throw err;
    } finally {
      // reload unfreeze
      this.ctx.app.meta.reload.unfreeze();
    }
  }

  async _findCliCommandAndCheckRight({ cliFullName, user }: any) {
    // command
    const command = this._findCliCommand({ cliFullName });
    // check right first
    const right = await this.app.bean.resource.checkRightResource({
      atomStaticKey: command.resource.atomStaticKey,
      user,
    });
    if (!right) this.app.throw(403);
    return command;
  }

  _findCliCommand({ cliFullName }: any) {
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
          const _command = this.app.bean.util.extend({}, command);
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
