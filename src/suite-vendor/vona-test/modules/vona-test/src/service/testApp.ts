import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceTestApp extends BeanBase<ScopeModule> {
  actionSync({ a, b }: any) {
    return a + b;
  }

  async actionAsync({ a, b }: any) {
    return Promise.resolve(a + b);
  }
}
