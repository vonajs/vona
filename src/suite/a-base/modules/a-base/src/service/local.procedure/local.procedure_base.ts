import { BeanBase, Cast } from 'vona';
import { LocalProcedure } from '../procedure.js';

export class LocalProcedureBase extends BeanBase {
  get self() {
    return Cast<LocalProcedure>(this);
  }
}
