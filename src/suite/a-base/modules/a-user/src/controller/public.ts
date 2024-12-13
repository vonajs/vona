mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerPublic extends BeanBase {
  async profile() {
    const res = await this.scope.service.public.profile({
      userId: this.ctx.request.body.userId,
    });
    this.app.success(res);
  }
}
