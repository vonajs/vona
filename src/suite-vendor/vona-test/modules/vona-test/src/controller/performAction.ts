import { BeanBase } from 'vona';
import { Api, Body } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Post } from 'vona-module-a-web';

@Controller({ path: 'performAction', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerPerformAction extends BeanBase {
  @Post('echo')
  @Public()
  echo(@Body('id') id: number) {
    const url = this.scope.util.combineApiPath('performAction/echo');
    return { id, url };
  }
}
