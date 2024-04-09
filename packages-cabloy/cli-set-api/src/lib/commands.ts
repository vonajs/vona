import createModule from './command/create.module.js';
import createSuite from './command/create.suite.js';

export const commands = {
  create: {
    suite: createSuite,
    module: createModule,
  },
};
