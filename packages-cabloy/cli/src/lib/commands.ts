import { commandsConfig } from '../config.js';

let __commandsMap;
let __commandsAll;

function _collectCommands() {
  const _commandsMap: any = {};
  const _commandsAll: any = {};
  const sets = commandsConfig.sets;
  for (const key in sets) {
    const setModuleName = sets[key];
    const setModule = require(setModuleName);
    const commands = setModule.commands;
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

_collectCommands();

export default { commandsMap: __commandsMap, commandsAll: __commandsAll };
