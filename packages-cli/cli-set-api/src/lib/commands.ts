import createBean from './command/create.bean.js';
import createModule from './command/create.module.js';
import createSuite from './command/create.suite.js';
import createTest from './command/create.test.js';
import defaultList from './command/default.list.js';
import initConfig from './command/init.config.js';
import initLocale from './command/init.locale.js';
import initMain from './command/init.main.js';
import initMonkey from './command/init.monkey.js';
import initStatic from './command/init.static.js';
import toolsBuild from './command/tools.build.js';
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
    test: createTest,
  },
  init: {
    config: initConfig,
    locale: initLocale,
    monkey: initMonkey,
    main: initMain,
    static: initStatic,
  },
  refactor: {},
  tools: {
    deps: toolsDeps,
    metadata: toolsMetadata,
    build: toolsBuild,
  },
};
