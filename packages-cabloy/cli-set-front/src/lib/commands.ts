import createComponent from './command/create.component.js';
import createModule from './command/create.module.js';
import createPage from './command/create.page.js';
import createSuite from './command/create.suite.js';

export const commands = {
  create: {
    suite: createSuite,
    module: createModule,
    page: createPage,
    component: createComponent,
  },
};
