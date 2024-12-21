import { BeanBase } from 'vona';
import { Public } from 'vona-module-a-user';
import { Controller, Get } from 'vona-module-a-web';

@Controller()
export class ControllerIndex extends BeanBase {
  @Get('//')
  @Public()
  index() {
    return this.scope.locale.helloVona();
  }
}
