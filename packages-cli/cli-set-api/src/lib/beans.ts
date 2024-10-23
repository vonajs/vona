import { CliDefaultList } from './bean/cli.default.list.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';
import { CliCreateModule } from './bean/cli.create.module.js';
import { CliCreateBean } from './bean/cli.create.bean.js';
import { CliToolsDeps } from './bean/cli.tools.deps.js';
import { CliToolsMetadata } from './bean/cli.tools.metadata.js';

export const beans = {
  'default.list': CliDefaultList,
  'create.suite': CliCreateSuite,
  'create.bean': CliCreateBean,
  'create.module': CliCreateModule,
  'tools.deps': CliToolsDeps,
  'tools.metadata': CliToolsMetadata,
};
