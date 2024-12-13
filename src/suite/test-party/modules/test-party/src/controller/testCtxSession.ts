mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import assert from 'assert';

@Controller()
export class ControllerTestCtxSession extends BeanBase {
  async session() {
    // key1
    this.ctx.session.test_key1 = 1;
    // echo1
    const res = await this.bean.executor.performAction({
      method: 'post',
      url: 'test/ctx/session/echo1',
    });
    assert.equal(res.user.op.id, this.ctx.state.user.op.id);
    assert.equal(res.instance.id, this.ctx.instance.id);
    assert.equal(this.ctx.session.test_key2, 2);
    // done
    this.app.success();
  }

  async echo1() {
    // echo2
    const res = await this.bean.executor.performAction({
      method: 'post',
      url: 'test/ctx/session/echo2',
    });
    // echo back
    this.app.success(res);
  }

  async echo2() {
    // check
    assert.equal(this.ctx.session.test_key1, 1);
    // key2
    this.ctx.session.test_key2 = 2;
    // echo back
    this.app.success({
      user: this.ctx.state.user,
      instance: this.ctx.instance,
    });
  }
}
