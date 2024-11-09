import { BeanBase, Controller, Get, useMiddlewareGlobal } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
@useMiddlewareGlobal('a-core:guard', { enable: false, test: 'from controller' })
@useMiddlewareGlobal('a-core:pipe', { enable: true })
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @useMiddlewareGlobal('a-core:guard', { enable: true, test: 'from action' })
  index() {
    return 'Hello Vona';
  }
}
