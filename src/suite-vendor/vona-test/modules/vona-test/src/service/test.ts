import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceTest extends BeanBase {
  get name() {
    return 'serviceTest';
  }
}
