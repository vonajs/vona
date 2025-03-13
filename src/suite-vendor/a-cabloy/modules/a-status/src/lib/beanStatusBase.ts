import { BeanBase, SymbolModuleBelong } from 'vona';

export class BeanStatusBase extends BeanBase {
  protected __get__(prop: string) {
    if (prop === 'get') {
      return (name: any) => {
        return this._get(name);
      };
    } else if (prop === 'set') {
      return (name: any, value: any) => {
        return this._set(name, value);
      };
    }
  }

  private get _modelStatus() {
    return this.$scope.status.model.status;
  }

  private async _get(name: any): Promise<any> {
    const status = await this._modelStatus.get({
      module: this[SymbolModuleBelong],
      name,
    });
    return status?.value;
  }

  private async _set(name: any, value: any): Promise<void> {
    await this._setInner(name, value, true);
  }

  private async _setInner(name: any, value: any, queue: boolean) {
    const status = await this._modelStatus.get({
      module: this[SymbolModuleBelong],
      name,
    });
    if (status) {
      await this._modelStatus.update({
        id: status.id,
        value: JSON.stringify(value),
      });
    } else {
      if (queue) {
        await this.$scope.status.redlock.lockIsolate(`statusSet.${this[SymbolModuleBelong]}.${name}`, async () => {
          return await this._setInner(name, value, false);
        });
      } else {
        await this._modelStatus.insert({
          module: this[SymbolModuleBelong],
          name,
          value: JSON.stringify(value),
        });
      }
    }
  }
}
