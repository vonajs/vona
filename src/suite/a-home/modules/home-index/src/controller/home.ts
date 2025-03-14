import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Get } from 'vona-module-a-web';
import { $locale } from '../.metadata/index.ts';

@Controller()
@Api.tags(['Home'])
export class ControllerHome extends BeanBase {
  @Get('//', { description: $locale('Home') })
  @Public()
  index() {
    return this.scope.locale.HelloVona();
  }
}
