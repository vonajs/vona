import { CliDefaultList } from './bean/cli.default.list.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';
import { CliCreateModule } from './bean/cli.create.module.js';
import { CliToolsDeps } from './bean/cli.tools.deps.js';

export const beans = {
  'default.list': CliDefaultList,
  'create.suite': CliCreateSuite,
  'create.module': CliCreateModule,
  'tools.deps': CliToolsDeps,
};
