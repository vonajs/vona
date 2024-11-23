import { BeanBase, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { Body, required } from 'vona-module-a-validator';

@Controller('performAction')
export class ControllerPerformAction extends BeanBase<ScopeModule> {
  @Post('echo')
  async echo(@Body('id', required()) id: number) {
    const url = this.scope.util.combineFetchPath('performAction/echo');
    return { id, url };
  }
}
