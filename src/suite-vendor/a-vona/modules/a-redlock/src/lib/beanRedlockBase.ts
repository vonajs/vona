import type { FunctionAsync } from 'vona';
import { BeanBase, SymbolModuleBelong } from 'vona';
import type { IRedlockLockIsolateOptions, IRedlockLockOptions } from '../types/redlock.js';

export class BeanRedlockBase extends BeanBase {
  protected __get__(prop: string) {
    if (prop === 'lock') {
      return (resource: string, fn: FunctionAsync<any>, options?: IRedlockLockOptions) => {
        return this.$scope.redlock.service.redlock.lock(this._prepareResource(resource), fn, options);
      };
    } else if (prop === 'lockIsolate') {
      return (resource: string, fn: FunctionAsync<any>, options?: IRedlockLockIsolateOptions) => {
        return this.$scope.redlock.service.redlock.lockIsolate(this._prepareResource(resource), fn, options);
      };
    }
  }

  private _prepareResource(resource: string) {
    return `${this[SymbolModuleBelong]}.${resource}`;
  }
}
