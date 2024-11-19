import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerJwt extends BeanBase<ScopeModule> {
  async create() {
    const res = await this.scope.service.jwt.create({
      scene: this.ctx.request.body.scene,
    });
    this.app.success(res);
  }
}
