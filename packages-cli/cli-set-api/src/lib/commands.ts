import defaultList from './command/default.list.js';
import createSuite from './command/create.suite.js';

export const commands = {
  default: {
    list: defaultList,
  },
  create: {
    suite: createSuite,
  },
  init: {},
  refactor: {},
  tools: {},
};
