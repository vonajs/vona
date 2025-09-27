import { BeanBase } from 'vona';

export class BeanMutateBase extends BeanBase {
  private _onReloadInstancesCancel?: Function;
  private _onDisposeInstancesCancel?: Function;

  protected __init__() {
    // event: databaseClientReload
    this._onReloadInstancesCancel = this.$scope.beanmutate.event.reloadInstances.on(async ({ beanFullName, data }, next) => {
      if (this.$beanFullName === beanFullName) {
        await this.onReloadInstance(data);
      }
      await next();
    });
    // event: databaseClientDispose
    this._onDisposeInstancesCancel = this.$scope.beanmutate.event.disposeInstances.on(async ({ beanFullName, data }, next) => {
      if (this.$beanFullName === beanFullName) {
        await this.onDisposeInstance(data);
      }
      await next();
    });
  }

  protected async __dispose__() {
    this._onReloadInstancesCancel?.();
    this._onDisposeInstancesCancel?.();
    this._onReloadInstancesCancel = undefined;
    this._onDisposeInstancesCancel = undefined;
  }

  protected async onReloadInstance(_data: unknown) {}

  protected async onDisposeInstance(_data: unknown) {
    await this.bean.disposeInstance(this.$beanInstanceKey);
  }
}
