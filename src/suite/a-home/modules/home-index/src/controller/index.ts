import { BeanBase, Controller, Get, UseGuardGlobal } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerIndex extends BeanBase<ScopeModule> {
  @Get('//')
  @UseGuardGlobal('a-core:user', { public: true })
  index() {
    return 'Hello Vona';
  }
}
