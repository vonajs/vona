export * from '../local/local.template.js';
export * from '../local/local.helper.js';
export * from '../local/local.console.js';
export * from '../local/cli.js';

import { LocalCli } from '../local/cli.js';

export interface IModuleService {
  cli: LocalCli;
}
