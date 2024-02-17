import { BeanBase, Cast } from '@cabloy/core';
import { LocalProcedure } from '../procedure.js';

export class LocalProcedureBase extends BeanBase {
  get self() {
    return Cast<LocalProcedure>(this);
  }
}
