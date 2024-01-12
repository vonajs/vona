import { BeanBase } from '@cabloy/core';

export class StartupWorkerAlive extends BeanBase {
  async execute() {
    const aliveTimeout = this.ctx.config.worker.alive.timeout;
    // interval
    setInterval(async () => {
      await (<any>this.app.bean).worker.setAlive();
    }, aliveTimeout);
    // alive
    await (<any>this.app.bean).worker.setAlive();
  }
}
