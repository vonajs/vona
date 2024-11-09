import { BeanBase, Controller, Get, UseMiddleware } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @UseMiddleware('a-core:transaction')
  index() {
    return 'Hello Vona';
  }
}
