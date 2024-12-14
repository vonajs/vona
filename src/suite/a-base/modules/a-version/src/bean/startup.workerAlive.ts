import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

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
