import { BeanBase, Controller, Get, UseGuard, UseGuardGlobal, UseMiddleware } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @UseMiddleware('a-core:transaction')
  @UseGuard('a-b4:test')
  @UseGuard('a-b4:test1')
  @UseGuardGlobal('a-core:user', { public: true })
  index() {
    return 'Hello Vona';
  }
}
