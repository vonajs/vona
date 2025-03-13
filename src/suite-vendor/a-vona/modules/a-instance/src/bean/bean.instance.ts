import type { ConfigInstanceBase, VonaConfig } from 'vona';
import type { EntityInstance } from '../entity/instance.ts';
import { isNil } from '@cabloy/utils';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanInstance extends BeanBase {
  private get modelInstance() {
    return this.scope.model.instance;
  }

  get config(): VonaConfig {
    return this.scope.service.instance.getConfig()!;
  }

  async list() {
    return await this.modelInstance.select();
  }

  async update(data: EntityInstance) {
    // update
    await this.modelInstance.update(data);
    // changed
    await this.scope.service.instance.instanceChanged();
  }

  async get(instanceName: string) {
    if (isNil(instanceName)) this.app.throw(403);
    return await this._get(instanceName);
  }

  private async _get(instanceName: string): Promise<EntityInstance | null> {
    // get
    const instance = await this.modelInstance.get({ name: instanceName });
    if (instance) return instance;
    // instance base
    const configInstanceBase = this.scope.service.instance.getConfigInstanceBase(instanceName);
    if (!configInstanceBase) return null;
    // lock
    return await this.scope.redlock.lockIsolate(
      `registerInstance.${instanceName}`,
      async () => {
        return await this._registerLock(configInstanceBase);
      },
      { instanceName: null },
    );
  }

  private async _registerLock(configInstanceBase: ConfigInstanceBase) {
    // get again
    let instance = await this.modelInstance.get({ name: configInstanceBase.instanceName });
    if (instance) return instance;
    // insert
    instance = {
      name: configInstanceBase.instanceName,
      title: configInstanceBase.title,
      config: JSON.stringify(configInstanceBase.config || {}),
      disabled: false,
    } as EntityInstance;
    return await this.modelInstance.insert(instance);
  }

  async reload() {
    // broadcast
    this.scope.broadcast.reload.emit();
  }
}
