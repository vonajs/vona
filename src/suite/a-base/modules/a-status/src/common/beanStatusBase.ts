import { BeanBase } from 'vona';

export class BeanStatusBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
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

  private async _get(name: any): Promise<any> {
    return name;
  }

  private async _set(name: any, value: any): Promise<void> {
    console.log(name, value);
  }
}
