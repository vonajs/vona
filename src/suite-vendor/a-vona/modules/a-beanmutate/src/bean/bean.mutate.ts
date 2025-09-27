import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanMutate extends BeanBase {
  async reloadInstances() {
    await this.reloadInstancesWorker(clientName, clientConfig, extraData);
    this.scope.broadcast.databaseClientReload.emit({ clientName, clientConfig, extraData });
  }

  async reloadInstancesWorker<T>(data: T) {
    await this.scope.event.databaseClientReload.emit(data);
  }

  async disposeInstances(clientName?: keyof IDatabaseClientRecord) {
    await this.disposeInstancesWorker(clientName);
    this.scope.broadcast.databaseClientDispose.emit({ clientName });
  }

  async disposeInstancesWorker<T>(data: T) {
    await this.scope.event.databaseClientDispose.emit(data);
  }
}
