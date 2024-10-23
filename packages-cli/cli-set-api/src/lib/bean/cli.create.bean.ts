import { BeanCliBase, CmdOptions } from '@cabloy/cli';

export class CliCreateBean extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
  }
}
