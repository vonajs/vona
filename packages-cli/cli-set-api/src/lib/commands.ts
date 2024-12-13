import defaultList from './command/default.list.js';
import createSuite from './command/create.suite.js';
import createModule from './command/create.module.js';
import createBean from './command/create.bean.js';
import createDto from './command/create.dto.js';
import createEntity from './command/create.entity.js';
import createService from './command/create.service.js';
import createController from './command/create.controller.js';
import createTest from './command/create.test.js';
import initConfig from './command/init.config.js';
import initLocale from './command/init.locale.js';
import initMonkey from './command/init.monkey.js';
import initMain from './command/init.main.js';
import initStatic from './command/init.static.js';
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
    dto: createDto,
    entity: createEntity,
    service: createService,
    controller: createController,
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
