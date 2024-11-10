import { BeanBase, Controller, Get, UseGuard, UseMiddleware } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @UseMiddleware('a-core:transaction')
  @UseGuard('a-b4:test')
  @UseGuard('a-b4:test1')
  @UseGuard('a-core:user', { public: false })
  index() {
    return 'Hello Vona';
  }
}
