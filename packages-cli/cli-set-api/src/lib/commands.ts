import defaultList from './command/default.list.js';
import createSuite from './command/create.suite.js';
import createModule from './command/create.module.js';
import createBean from './command/create.bean.js';
import initMonkey from './command/init.monkey.js';
import toolsDeps from './command/tools.deps.js';
import toolsMetadata from './command/tools.metadata.js';
import toolsBuild from './command/tools.build.js';

export const commands = {
  default: {
    list: defaultList,
  },
  create: {
    suite: createSuite,
    module: createModule,
    bean: createBean,
  },
  init: {
    monkey: initMonkey,
  },
  refactor: {},
  tools: {
    deps: toolsDeps,
    metadata: toolsMetadata,
    build: toolsBuild,
  },
};
