import { Bean } from 'vona-module-a-bean';
import { ConfigInstanceBase, isNil, VonaConfig } from 'vona';
import { BeanBase } from 'vona';
import { EntityInstance } from '../entity/instance.js';

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

  async get(subdomain: string) {
    if (isNil(subdomain)) this.app.throw(403);
    return await this._get(subdomain);
  }

  private async _get(subdomain: string): Promise<EntityInstance | null> {
    // get
    const instance = await this.modelInstance.get({ name: subdomain });
    if (instance) return instance;
    // instance base
    const configInstanceBase = this.scope.service.instance.getConfigInstanceBase(subdomain);
    if (!configInstanceBase) return null;
    // lock
    return await this.scope.redlock.lockIsolate(
      `registerInstance.${subdomain}`,
      async () => {
        return await this._registerLock(configInstanceBase);
      },
      { subdomain: null },
    );
  }

  private async _registerLock(configInstanceBase: ConfigInstanceBase) {
    // get again
    let instance = await this.modelInstance.get({ name: configInstanceBase.subdomain });
    if (instance) return instance;
    // insert
    instance = {
      name: configInstanceBase.subdomain,
      title: configInstanceBase.title,
      config: JSON.stringify(configInstanceBase.config || {}),
      disabled: false,
    } as EntityInstance;
    const res = await this.modelInstance.insert(instance);
    instance.id = res[0] as number;
    return instance;
  }

  async reload() {
    // broadcast
    this.scope.broadcast.reload.emit();
  }
}
