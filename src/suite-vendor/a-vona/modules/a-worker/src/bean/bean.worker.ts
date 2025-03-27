import cluster from 'node:cluster';
import { isNil } from '@cabloy/utils';
import { BeanBase, closeApp, uuidv4 } from 'vona';
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
    await this.scope.cacheRedis.workerAlive.set(true, id ?? this.id, { ttl: aliveTimeout + aliveTimeoutMore });
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
    if (!cluster.worker) {
      return;
      // maybe throw uncaughtException
      // throw new Error('Only take affect in cluster');
    }
    await closeApp(false);
    cluster.worker.send('reload-worker');
  }

  async reloadAll() {
    if (!cluster.worker) {
      return;
      // maybe throw uncaughtException
      // throw new Error('Only take affect in cluster');
    }
    this.scope.broadcast.reloadAll.emit();
  }
}
