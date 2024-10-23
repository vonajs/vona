import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Service()
export class ServiceHome extends BeanBase<ScopeModule> {
  async echo({ user: _user }) {
    return 'Hello World!';
  }
}
