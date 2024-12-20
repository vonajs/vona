import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

// todo: remove
@Bean()
export class BeanDebug extends BeanBase {
  get(_name: string) {
    const fn = (..._args) => {};
    fn.enabled = false;
    return fn;
  }
}
