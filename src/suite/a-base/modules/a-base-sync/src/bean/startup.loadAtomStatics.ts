import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'startup' })
export class StartupLoadAtomStatics extends BeanBase {
  async execute() {
    await this.ctx.bean.atomStatic.loadAllAtomStatics();
  }
}
