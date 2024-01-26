export * from '../local/template.js';
export * from '../local/helper.js';
export * from '../local/console.js';
export * from '../local/cli.js';

import { LocalTemplate } from '../local/template.js';
import { LocalHelper } from '../local/helper.js';
import { LocalConsole } from '../local/console.js';
import { LocalCli } from '../local/cli.js';

export interface IModuleLocal {
  template: LocalTemplate;
  helper: LocalHelper;
  console: LocalConsole;
  cli: LocalCli;
}
