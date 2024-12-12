import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerTest extends BeanBase {
  async echo() {
    const echo = this.ctx.request.body.echo;
    // this.app.throw(403);
    this.app.success({
      echo,
      query: this.ctx.request.query,
    });
  }
}
