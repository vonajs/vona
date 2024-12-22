import { BeanBase } from 'vona';
import { Body } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';

@Controller({ path: 'performAction', meta: { mode: 'unittest' } })
export class ControllerPerformAction extends BeanBase {
  @Post('echo')
  echo(@Body('id') id: number) {
    const url = this.scope.util.combineApiPath('performAction/echo');
    return { id, url };
  }
}
