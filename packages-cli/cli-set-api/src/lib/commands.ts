import defaultList from './command/default.list.js';
import createSuite from './command/create.suite.js';
import createModule from './command/create.module.js';
import createBean from './command/create.bean.js';
import createDto from './command/create.dto.js';
import createEntity from './command/create.entity.js';
import createModel from './command/create.model.js';
import createService from './command/create.service.js';
import createController from './command/create.controller.js';
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
    model: createModel,
    service: createService,
    controller: createController,
  },
  init: {
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
