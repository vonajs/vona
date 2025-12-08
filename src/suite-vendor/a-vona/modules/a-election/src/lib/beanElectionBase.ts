import type { IElectionElectOptions, TypeFunctionRelease } from '../types/election.ts';
import { BeanBase, SymbolModuleBelong } from 'vona';

export class BeanElectionBase<TypeElectionObtainResource extends string> extends BeanBase {
  obtain(resource: TypeElectionObtainResource, fn: TypeFunctionRelease, options?: IElectionElectOptions): void {
    return this.$scope.election.service.election.obtain(this._prepareResource(resource), fn, options);
  }

  async release(resource: TypeElectionObtainResource, options?: IElectionElectOptions): Promise<void> {
    return await this.$scope.election.service.election.release(this._prepareResource(resource), options);
  }

  private _prepareResource(resource: string) {
    return `${this[SymbolModuleBelong]}.${resource}`;
  }
}
