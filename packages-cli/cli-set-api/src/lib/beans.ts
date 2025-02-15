import { CliCreateBean } from './bean/cli.create.bean.js';
import { CliCreateModule } from './bean/cli.create.module.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';
import { CliCreateTest } from './bean/cli.create.test.js';
import { CliDefaultList } from './bean/cli.default.list.js';
import { CliInitConfig } from './bean/cli.init.config.js';
import { CliInitLocale } from './bean/cli.init.locale.js';
import { CliInitMain } from './bean/cli.init.main.js';
import { CliInitMonkey } from './bean/cli.init.monkey.js';
import { CliInitStatic } from './bean/cli.init.static.js';
import { CliToolsBuild } from './bean/cli.tools.build.js';
import { CliToolsDeps } from './bean/cli.tools.deps.js';
import { CliToolsMetadata } from './bean/cli.tools.metadata.js';

export const beans = {
  'default.list': CliDefaultList,
  'create.suite': CliCreateSuite,
  'create.bean': CliCreateBean,
  'create.module': CliCreateModule,
  'create.test': CliCreateTest,
  'init.config': CliInitConfig,
  'init.locale': CliInitLocale,
  'init.monkey': CliInitMonkey,
  'init.main': CliInitMain,
  'init.static': CliInitStatic,
  'tools.deps': CliToolsDeps,
  'tools.metadata': CliToolsMetadata,
  'tools.build': CliToolsBuild,
};
