import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanMutate extends BeanBase {
  async reloadInstances<T>(data: T) {
    await this.reloadInstancesWorker(data);
    this.scope.broadcast.reloadInstances.emit(data);
  }

  async reloadInstancesWorker<T>(data: T) {
    await this.scope.event.reloadInstances.emit(data);
  }

  async disposeInstances<T>(data: T) {
    await this.disposeInstancesWorker(data);
    this.scope.broadcast.disposeInstances.emit(data);
  }

  async disposeInstancesWorker<T>(data: T) {
    await this.scope.event.disposeInstances.emit(data);
  }
}
