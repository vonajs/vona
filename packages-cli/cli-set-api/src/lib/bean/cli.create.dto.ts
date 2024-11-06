import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateDto extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'dto');
  }
}
