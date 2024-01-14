import { BeanBase } from '@cabloy/core';

export class StartupDatabaseName extends BeanBase {
  async execute() {
    const beanVersion = (<any>this.ctx.bean).local.version;
    return await beanVersion.databaseNameStartup();
  }
}
