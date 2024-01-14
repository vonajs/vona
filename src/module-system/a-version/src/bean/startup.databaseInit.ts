import { BeanBase } from '@cabloy/core';

export class StartupDatabaseInit extends BeanBase {
  async execute() {
    const beanVersion = (<any>this.ctx.bean).local.version;
    return await beanVersion.databaseInitStartup();
  }
}
