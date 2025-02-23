import { CliBinBuild } from './bean/cli.bin.build.ts';
import { CliBinDev } from './bean/cli.bin.dev.ts';
import { CliBinTest } from './bean/cli.bin.test.ts';
import { CliBinTsc } from './bean/cli.bin.tsc.ts';
import { CliCreateBean } from './bean/cli.create.bean.ts';
import { CliCreateModule } from './bean/cli.create.module.ts';
import { CliCreateSuite } from './bean/cli.create.suite.ts';
import { CliCreateTest } from './bean/cli.create.test.ts';
import { CliDefaultList } from './bean/cli.default.list.ts';
import { CliInitConfig } from './bean/cli.init.config.ts';
import { CliInitLocale } from './bean/cli.init.locale.ts';
import { CliInitMain } from './bean/cli.init.main.ts';
import { CliInitMonkey } from './bean/cli.init.monkey.ts';
import { CliInitStatic } from './bean/cli.init.static.ts';
import { CliToolsDeps } from './bean/cli.tools.deps.ts';
import { CliToolsMetadata } from './bean/cli.tools.metadata.ts';

export const beans = {
  'default.list': CliDefaultList,
  'bin.build': CliBinBuild,
  'bin.dev': CliBinDev,
  'bin.test': CliBinTest,
  'bin.tsc': CliBinTsc,
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
};
