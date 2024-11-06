import { CliDefaultList } from './bean/cli.default.list.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';
import { CliCreateModule } from './bean/cli.create.module.js';
import { CliCreateBean } from './bean/cli.create.bean.js';
import { CliCreateDto } from './bean/cli.create.dto.js';
import { CliCreateEntity } from './bean/cli.create.entity.js';
import { CliInitMonkey } from './bean/cli.init.monkey.js';
import { CliInitMain } from './bean/cli.init.main.js';
import { CliToolsDeps } from './bean/cli.tools.deps.js';
import { CliToolsMetadata } from './bean/cli.tools.metadata.js';
import { CliToolsBuild } from './bean/cli.tools.build.js';

export const beans = {
  'default.list': CliDefaultList,
  'create.suite': CliCreateSuite,
  'create.bean': CliCreateBean,
  'create.module': CliCreateModule,
  'create.dto': CliCreateDto,
  'create.entity': CliCreateEntity,
  'init.monkey': CliInitMonkey,
  'init.main': CliInitMain,
  'tools.deps': CliToolsDeps,
  'tools.metadata': CliToolsMetadata,
  'tools.build': CliToolsBuild,
};
