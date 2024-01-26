export * from '../bean/version.manager.js';
export * from '../bean/virtual.cliBase.js';
export * from '../bean/bean.cli.js';

import { BeanCliBase } from '../bean/virtual.cliBase.js';
import { BeanCli } from '../bean/bean.cli.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    cliBase: BeanCliBase;
    cli: BeanCli;
  }
}
