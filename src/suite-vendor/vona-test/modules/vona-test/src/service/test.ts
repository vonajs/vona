import { BeanBase, Service } from 'vona';

@Service()
export class ServiceTest extends BeanBase {
  get name() {
    return 'serviceTest';
  }
}
