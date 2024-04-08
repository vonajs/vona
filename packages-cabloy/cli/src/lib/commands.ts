import { commandsConfig } from '../config.js';

let __commandsMap;
let __commandsAll;

function _collectCommands() {
  const _commandsMap: any = {};
  const _commandsAll: any = {};
  const sets = commandsConfig.sets;
  for (const setKey in sets) {
    const setModuleName = sets[setKey];
    const setModule = require(setModuleName);
    const commands = setModule.commands;
    if (!commands) continue;
    const _commandsSet = (_commandsAll[setKey] = {});
    for (const groupName in commands) {
      const group = commands[groupName];
      const _commandsGroup = (_commandsSet[groupName] = {});
      for (const key in group) {
        const command = group[key];
        const fullKey = `${setKey}:${groupName}:${key}`;
        // command BeanClass
        const BeanClass = setModule.beans[command.bean];
        // ok
        _commandsMap[fullKey] = _commandsGroup[key] = { command, BeanClass };
      }
    }
  }
  // ok
  __commandsMap = _commandsMap;
  __commandsAll = _commandsAll;
}

_collectCommands();

export const commandsMeta = { commandsMap: __commandsMap, commandsAll: __commandsAll };

export function findCommand(cliFullName: string) {
  return __commandsMap[cliFullName];
}
