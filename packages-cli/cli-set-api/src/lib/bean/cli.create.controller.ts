import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateController extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'controller');
  }
}
