import type { FunctionAsync } from 'vona';
import type { IElectionElectOptions, TypeFunctionRelease } from '../types/election.ts';
import { BeanBase, SymbolModuleBelong } from 'vona';

export class BeanElectionBase<TypeElectionObtainResource extends string> extends BeanBase {
  obtain(resource: TypeElectionObtainResource, fn: TypeFunctionRelease, options?: IElectionElectOptions): void {
    return this.$scope.election.service.election.obtain(this._prepareResource(resource), fn, options);
  }

  protected __get__(prop: string) {
    if (prop === 'obtain') {
      return (resource: string, fn: FunctionAsync<any>, options?: IElectionElectOptions) => {
        return this.$scope.election.service.election.obtain(this._prepareResource(resource), fn, options);
      };
    }
  }

  private _prepareResource(resource: string) {
    return `${this[SymbolModuleBelong]}.${resource}`;
  }
}
