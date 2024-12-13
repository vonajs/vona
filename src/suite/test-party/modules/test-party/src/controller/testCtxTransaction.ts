mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerTestCtxTransaction extends BeanBase {
  async transaction() {
    // user
    const user = this.ctx.state.user.op;
    // atomKey
    const atomKey = this.ctx.request.body.key;
    // itemNew
    const itemNew = this.ctx.request.body.item;

    // write
    await this.app.bean.atom.write({
      key: atomKey,
      item: { atomName: itemNew.atomName },
      user,
    });
    // write: throw error when personCount is 0
    await this.app.bean.atom.write({
      key: atomKey,
      item: { personCount: itemNew.personCount },
      user,
    });
    // done
    this.app.success();
  }
}
