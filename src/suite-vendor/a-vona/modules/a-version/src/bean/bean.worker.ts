import { Bean } from 'vona-module-a-bean';
import { BeanBase, uuidv4 } from 'vona';

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
    await this.scope.cacheRedis.workerAlive.set(true, id ?? this.id, aliveTimeout * 2);
  }

  async getAlive(id?: string) {
    return await this.scope.cacheRedis.workerAlive.get(id ?? this.id);
  }
}
