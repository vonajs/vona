import { BeanBase, Controller, Get } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  index() {
    return 'Hello Vona';
  }
}
