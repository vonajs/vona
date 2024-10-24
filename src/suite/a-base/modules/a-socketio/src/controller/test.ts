import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerTest extends BeanBase<ScopeModule> {
  async echo() {
    const echo = this.ctx.request.body.echo;
    // this.ctx.throw(403);
    this.ctx.success({
      echo,
      query: this.ctx.request.query,
    });
  }
}
