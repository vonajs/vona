import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerUserOnline extends BeanBase<ScopeModule> {}
