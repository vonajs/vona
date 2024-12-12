import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerTestFeatMiddleware extends BeanBase {
  async interception() {
    const { a, b } = this.ctx.request.body;
    const c = parseInt(a) + parseInt(b);
    this.app.success(c);
  }

  async restructuring() {
    const { a, b } = this.ctx.request.body;
    const c = a + b;
    this.app.success(c);
  }
}
