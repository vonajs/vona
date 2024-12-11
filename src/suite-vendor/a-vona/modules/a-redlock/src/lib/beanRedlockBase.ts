import { BeanBase, FunctionAsync } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';
import { IRedlockLockIsolateOptions, IRedlockLockOptions } from '../types/redlock.js';

export class BeanRedlockBase<TScopeModule = unknown> extends BeanBase<TScopeModule> {
  protected __get__(prop: string) {
    if (prop === 'lock') {
      return (resource: string, fn: FunctionAsync<any>, options?: IRedlockLockOptions) => {
        return this.bean.redlock.lock(this._prepareResource(resource), fn, options);
      };
    } else if (prop === 'lockIsolate') {
      return (resource: string, fn: FunctionAsync<any>, options?: IRedlockLockIsolateOptions) => {
        return this.bean.redlock.lockIsolate(this._prepareResource(resource), fn, options);
      };
    }
  }

  private _prepareResource(resource: string) {
    return `${this.moduleBelong}.${resource}`;
  }
}
