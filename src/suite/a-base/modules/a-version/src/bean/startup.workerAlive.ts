import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup()
export class StartupWorkerAlive extends BeanBase implements IStartupExecute {
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
