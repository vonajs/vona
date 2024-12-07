import { BeanBase, IStartupExecute, Startup } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Startup()
export class StartupWorkerAlive extends BeanBase<ScopeModule> implements IStartupExecute {
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
