import { BeanBase, Controller, Get, useMiddleware } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
@useMiddleware('a-core:development', { local: false })
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  index() {
    return 'Hello Vona';
  }
}
