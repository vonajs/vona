import binBuild from './command/bin.build.ts';
import binDev from './command/bin.dev.ts';
import binTsc from './command/bin.tsc.ts';
import createBean from './command/create.bean.ts';
import createModule from './command/create.module.ts';
import createSuite from './command/create.suite.ts';
import createTest from './command/create.test.ts';
import defaultList from './command/default.list.ts';
import initConfig from './command/init.config.ts';
import initLocale from './command/init.locale.ts';
import initMain from './command/init.main.ts';
import initMonkey from './command/init.monkey.ts';
import initStatic from './command/init.static.ts';
import toolsDeps from './command/tools.deps.ts';
import toolsMetadata from './command/tools.metadata.ts';

export const commands = {
  default: {
    list: defaultList,
  },
  bin: {
    build: binBuild,
    dev: binDev,
    tsc: binTsc,
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
  },
};
