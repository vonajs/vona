import { BeanBase } from 'vona';
import { Public } from 'vona-module-a-user';
import { Controller, Get } from 'vona-module-a-web';
import { locale } from '../.metadata/index.js';

@Controller()
export class ControllerIndex extends BeanBase {
  @Get('//', { description: locale('Home') })
  @Public()
  index() {
    return this.scope.locale.HelloVona();
  }
}
