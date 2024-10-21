import defaultList from './command/default.list.js';
import createSuite from './command/create.suite.js';
import createModule from './command/create.module.js';
import toolsDeps from './command/tools.deps.js';

export const commands = {
  default: {
    list: defaultList,
  },
  create: {
    suite: createSuite,
    module: createModule,
  },
  init: {},
  refactor: {},
  tools: {
    deps: toolsDeps,
  },
};
