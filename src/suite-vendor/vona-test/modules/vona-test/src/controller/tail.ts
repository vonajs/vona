import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller('tail')
export class ControllerTail extends BeanBase<ScopeModule> {}
