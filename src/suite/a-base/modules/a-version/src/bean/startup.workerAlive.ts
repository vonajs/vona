import { Bean, BeanBase } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

@Bean({ scene: 'startup' })
export class StartupWorkerAlive extends BeanBase {
  get scope() {
    return this.getScope() as ScopeModule;
  }

  async execute() {
    const aliveTimeout = this.scope.config.worker.alive.timeout;
    // interval
    setInterval(async () => {
      await this.app.bean.worker.setAlive();
    }, aliveTimeout);
    // alive
    await this.app.bean.worker.setAlive();
  }
}
