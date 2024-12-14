import { BeanBase, Get } from 'vona';
import { UseGuardGlobal } from 'vona-module-a-aspect';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerIndex extends BeanBase {
  @Get('//')
  @UseGuardGlobal('a-core:user', { public: true })
  index() {
    return this.scope.locale.helloVona();
  }
}
