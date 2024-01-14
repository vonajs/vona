import { BeanBase } from '@cabloy/core';

export class StartupInstanceInit extends BeanBase {
  async execute(context) {
    const options = context.options;
    const beanVersion = (<any>this.ctx.bean).local.version;
    return await beanVersion.instanceInitStartup({ options });
  }
}
