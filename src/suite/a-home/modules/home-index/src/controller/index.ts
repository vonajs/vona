import { BeanBase, Controller, Get, UseMiddleware } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
@UseMiddleware('a-core:development', { local: false })
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @UseMiddleware('a-core:development', { local: true })
  index() {
    return 'Hello Vona';
  }
}
