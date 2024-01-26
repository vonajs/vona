export * from '../bean/version.manager.js';
export * from '../bean/bean.cliBase.js';
export * from '../bean/bean.cli.js';

import { BeanCliBase } from '../bean/bean.cliBase.js';
import { BeanCli } from '../bean/bean.cli.js';

export interface IBeanRecord {
  cliBase: BeanCliBase;
  cli: BeanCli;
}
