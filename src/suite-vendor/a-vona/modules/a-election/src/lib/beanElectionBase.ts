import type { FunctionAsync } from 'vona';
import type { IElectionElectOptions } from '../types/election.ts';
import { BeanBase, SymbolModuleBelong } from 'vona';

export class BeanElectionBase extends BeanBase {
  protected __get__(prop: string) {
    if (prop === 'elect') {
      return (resource: string, fn: FunctionAsync<any>, options?: IElectionElectOptions) => {
        return this.$scope.election.service.election.elect(this._prepareResource(resource), fn, options);
      };
    }
  }

  private _prepareResource(resource: string) {
    return `${this[SymbolModuleBelong]}.${resource}`;
  }
}
