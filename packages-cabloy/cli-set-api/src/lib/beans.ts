import { CliCreateModule } from './bean/cli.create.module.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';

export const beans = {
  'create.suite': CliCreateSuite,
  'create.module': CliCreateModule,
};
