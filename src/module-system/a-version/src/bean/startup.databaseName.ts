import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupDatabaseName extends BeanBase {
  async execute() {
    const beanVersion = (<any>this.ctx.bean).local.version;
    return await beanVersion.databaseNameStartup();
  }
}
