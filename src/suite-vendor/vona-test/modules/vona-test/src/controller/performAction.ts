import { BeanBase, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { Body } from 'vona-module-a-validator';

@Controller({ path: 'performAction', meta: { mode: 'unittest' } })
export class ControllerPerformAction extends BeanBase<ScopeModule> {
  @Post('echo')
  async echo(@Body('id') id: number) {
    const url = this.scope.util.combineApiPath('performAction/echo');
    return { id, url };
  }
}
