import { BeanBase, Controller, Get, useMiddleware, useMiddlewareGlobal } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
@useMiddlewareGlobal('a-core:guard', {})
@useMiddleware('a-core:development', { local: false })
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  index() {
    return 'Hello Vona';
  }
}
