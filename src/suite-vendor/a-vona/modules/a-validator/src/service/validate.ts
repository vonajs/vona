import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Service()
export class ServiceValidate extends BeanBase<ScopeModule> {}
