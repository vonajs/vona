import defaultList from './command/default.list.js';
import createSuite from './command/create.suite.js';
import createModule from './command/create.module.js';
import createBean from './command/create.bean.js';
import toolsDeps from './command/tools.deps.js';
import toolsMetadata from './command/tools.metadata.js';

export const commands = {
  default: {
    list: defaultList,
  },
  create: {
    suite: createSuite,
    module: createModule,
    bean: createBean,
  },
  init: {},
  refactor: {},
  tools: {
    deps: toolsDeps,
    metadata: toolsMetadata,
  },
};
