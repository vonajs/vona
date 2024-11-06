import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateEntity extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'entity');
  }
}
