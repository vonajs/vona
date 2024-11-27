import { BeanBase, cast } from 'vona';
import { ServiceProcedure } from '../procedure.js';

export class LocalProcedureBase extends BeanBase {
  get self() {
    return Cast<ServiceProcedure>(this);
  }
}
