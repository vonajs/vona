import { CliCreateComponent } from './bean/cli.create.component.js';
import { CliCreateModule } from './bean/cli.create.module.js';
import { CliCreatePage } from './bean/cli.create.page.js';
import { CliCreateSuite } from './bean/cli.create.suite.js';

export const beans = {
  'create.suite': CliCreateSuite,
  'create.module': CliCreateModule,
  'create.page': CliCreatePage,
  'create.component': CliCreateComponent,
};
