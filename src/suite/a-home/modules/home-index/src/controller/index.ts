import { BeanBase, Controller, Get, UseGuardGlobal } from 'vona';

@Controller()
export class ControllerIndex extends BeanBase {
  @Get('//')
  @UseGuardGlobal('a-core:user', { public: true })
  index() {
    return this.scope.locale.helloVona();
  }
}
