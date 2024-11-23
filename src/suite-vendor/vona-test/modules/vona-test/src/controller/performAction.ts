import { BeanBase, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller('performAction')
export class ControllerPerformAction extends BeanBase<ScopeModule> {
  @Post('echo')
  async echo() {
    return this.ctx.request.body.id;
  }
}
