import { BeanBase, Post } from 'vona';
import { Body } from 'vona-module-a-validator';
import { Controller } from 'vona-module-a-web';

@Controller({ path: 'performAction', meta: { mode: 'unittest' } })
export class ControllerPerformAction extends BeanBase {
  @Post('echo')
  async echo(@Body('id') id: number) {
    const url = this.scope.util.combineApiPath('performAction/echo');
    return { id, url };
  }
}
