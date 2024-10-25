import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, Cast, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';
import { ServiceTest } from '../index.js';

@Controller()
export class ControllerTestFeatBean extends BeanBase<ScopeModule> {
  async beanTest() {
    const a = 3;
    const b = 4;
    let res;

    // app.bean
    assert.equal(this.app.bean['test-party.test.app'], this.app.bean['test-party.test.app']);

    res = this.app.bean['test-party.test.app'].actionSync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    res = await this.app.bean['test-party.test.app'].actionAsync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    // ctx.bean: global
    assert.equal(this.bean.testCtx, this.ctx.bean.testCtx);

    // magic
    res = Cast(this.bean.testCtx).magic;
    assert.equal(res, 'magic:simpleaop');

    // name
    this.bean.testCtx.name = 'test-party:simpleaop:regexpaop';
    res = this.bean.testCtx.name;
    assert.equal(res, 'test-party:simpleaop:regexpaop');

    res = this.bean.testCtx.actionSync({ a, b });
    assert.equal(res, `${a + b}:simpleaop:regexpaop`);

    res = await this.bean.testCtx.actionAsync({ a, b });
    assert.equal(res, `${a + b}:simpleaop:regexpaop`);

    res = await this.bean.testCtx.actionAsync2({ a, b });
    assert.equal(res, `test-party:simpleaop:regexpaop:${a + b}:simpleaop:regexpaop`);

    res = await this.bean.testCtx.actionAsync3({ a, b });
    assert.equal(res, `test-party:simpleaop:regexpaop:${a + b}:simpleaop:regexpaop`);

    // ctx.bean: class
    assert.equal(this.bean['test-party.test.class'], this.ctx.bean['test-party.test.class']);

    res = this.bean['test-party.test.class'].actionSync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    res = await this.bean['test-party.test.class'].actionAsync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    // magic of self
    Cast(this.bean.testCtx).magicSelf = '__magicSelf__';
    res = Cast(this.ctx.bean.testCtx).magicSelf;
    assert.equal(res, '__magicSelf__');
    res = Cast(this.ctx.bean.testCtx)['magic:self'];
    assert.equal(res, '__magicSelf__');

    // ok
    this.ctx.success();
  }

  async serviceTest() {
    let res;

    // general way
    res = this.bean._getBean(ServiceTest).name;
    assert.equal(res, 'serviceTest');

    res = this.bean._getBean('test-party.service.test').name;
    assert.equal(res, 'serviceTest');

    // this module
    res = this.scope.service.test.name;
    assert.equal(res, 'serviceTest');

    // other module
    res = this.bean.scope(__ThisModule__).service.test.name;
    assert.equal(res, 'serviceTest');

    res = this.$scopeTestParty.service.test.name;
    assert.equal(res, 'serviceTest');

    // ok
    this.ctx.success();
  }
}
