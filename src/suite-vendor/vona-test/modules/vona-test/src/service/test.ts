import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceTest extends BeanBase<ScopeModule> {
  get name() {
    return 'serviceTest';
  }
}
