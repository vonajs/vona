import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerTest extends BeanBase<ScopeModule> {
  async echo() {
    const echo = this.ctx.request.body.echo;
    // this.app.throw(403);
    this.app.success({
      echo,
      query: this.ctx.request.query,
    });
  }
}
