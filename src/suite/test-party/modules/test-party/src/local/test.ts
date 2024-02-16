import { Local, BeanBase } from '@cabloy/core';

@Local()
export class LocalTest extends BeanBase {
  get name() {
    return 'localTest';
  }
}
