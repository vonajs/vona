import { isNil } from '@cabloy/utils';
import { BeanBase, cast, uuidv4 } from 'vona';
import { Bean } from 'vona-module-a-bean';

const SymbolWorkerId = Symbol('SymbolWorkerId');

@Bean()
export class BeanWorker extends BeanBase {
  get id(): string {
    if (this.app[SymbolWorkerId] === undefined) {
      this.app[SymbolWorkerId] = uuidv4();
    }
    return this.app[SymbolWorkerId];
  }

  async setAlive(id?: string) {
    const aliveTimeout = this.scope.config.worker.alive.timeout;
    const aliveTimeoutMore = this.scope.config.worker.alive.timeoutMore;
    await this.scope.cacheRedis.workerAlive.set(true, id ?? this.id, aliveTimeout + aliveTimeoutMore);
  }

  async delAlive(id?: string) {
    await this.scope.cacheRedis.workerAlive.del(id ?? this.id);
  }

  async getAlive(id?: string) {
    if (isNil(id) || id === this.id) return true;
    return await this.scope.cacheRedis.workerAlive.get(id ?? this.id);
  }

  async exit(code?: number | string | null | undefined) {
    await this.app.meta.close();
    process.exit(code);
  }

  async exitAll(code?: number | string | null | undefined) {
    this.scope.broadcast.exitAll.emit({ code });
  }

  async reload() {
    await this.app.meta.close();
    cast(process).send({
      to: 'master',
      action: 'reload-worker',
    });
    // todo: process.exit('reload-worker')，用于在cluster中监听进程关闭，然后fork new worker
  }

  async reloadAll() {
    this.scope.broadcast.reloadAll.emit();
  }
}
