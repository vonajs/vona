import { Local, BeanBase } from 'vona';

@Local()
export class LocalTest extends BeanBase {
  get name() {
    return 'localTest';
  }
}
