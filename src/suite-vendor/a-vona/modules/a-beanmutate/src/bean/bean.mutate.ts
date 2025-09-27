import type { Constructable, IBeanRecord } from 'vona';
import type { TypeEventDisposeInstancesData } from './event.disposeInstances.ts';
import type { TypeEventReloadInstancesData } from './event.reloadInstances.ts';
import { appResource, BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanMutate extends BeanBase {
  async reloadInstances<T>(beanFullName: Constructable, data: T): Promise<void>;
  async reloadInstances<K extends keyof IBeanRecord, T>(beanFullName: K, data: T): Promise<void>;
  async reloadInstances<T>(beanFullName: any, data: T): Promise<void> {
    beanFullName = appResource.getBeanFullName(beanFullName);
    await this.reloadInstancesWorker({ beanFullName, data });
    this.scope.broadcast.reloadInstances.emit({ beanFullName, data });
  }

  async reloadInstancesWorker(data: TypeEventReloadInstancesData) {
    await this.scope.event.reloadInstances.emit(data);
  }

  async disposeInstances<T>(data: T) {
    await this.disposeInstancesWorker(data);
    this.scope.broadcast.disposeInstances.emit(data);
  }

  async disposeInstancesWorker(data: TypeEventDisposeInstancesData) {
    await this.scope.event.disposeInstances.emit(data);
  }
}
