import { BeanBase, Controller, Get, useMiddlewareGlobal } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @useMiddlewareGlobal('a-core:guard', { enable: false, test: 'from action' })
  index() {
    return 'Hello Vona';
  }
}
