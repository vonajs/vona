import assert from 'node:assert';
import { BeanBase, cast } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Controller, Get } from 'vona-module-a-web';
import { __ThisModule__ } from '../.metadata/this.js';
import { ServiceTest } from '../service/test.js';

@Controller({ path: 'bean', meta: { mode: 'unittest' } })
@Api.exclude()
export class ControllerBean extends BeanBase {
  @Get('test')
  async test() {
    const a = 3;
    const b = 4;
    let res;

    // app.bean
    assert.equal(this.app.bean._getBean('vona-test.service.testApp'), this.app.bean['vona-test.service.testApp']);

    res = this.app.bean['vona-test.service.testApp'].actionSync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    res = await this.app.bean['vona-test.service.testApp'].actionAsync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    // ctx.bean: global
    assert.equal(this.bean.testCtx, this.app.bean.testCtx);

    // magic
    res = cast(this.bean.testCtx).magic;
    assert.equal(res, 'magic:simpleaop');

    // name
    this.bean.testCtx.name = 'vona-test:simpleaop:regexpaop';
    res = this.bean.testCtx.name;
    assert.equal(res, 'vona-test:simpleaop:regexpaop');

    res = this.bean.testCtx.actionSync({ a, b });
    assert.equal(res, `${a + b}:simpleaop:regexpaop`);

    res = await this.bean.testCtx.actionAsync({ a, b });
    assert.equal(res, `${a + b}:simpleaop:regexpaop`);

    res = await this.bean.testCtx.actionAsync2({ a, b });
    assert.equal(res, `vona-test:simpleaop:regexpaop:${a + b}:simpleaop:regexpaop`);

    res = await this.bean.testCtx.actionAsync3({ a, b });
    assert.equal(res, `vona-test:simpleaop:regexpaop:${a + b}:simpleaop:regexpaop`);

    // ctx.bean: class
    assert.equal(this.bean['vona-test.service.testClass'], this.app.bean['vona-test.service.testClass']);

    res = this.bean['vona-test.service.testClass'].actionSync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    res = await this.bean['vona-test.service.testClass'].actionAsync({ a, b });
    assert.equal(res, `${a + b}:regexpaop`);

    // magic of self
    cast(this.bean.testCtx).magicSelf = '__magicSelf__';
    res = cast(this.app.bean.testCtx).magicSelf;
    assert.equal(res, '__magicSelf__');
    res = cast(this.app.bean.testCtx)['magic:self'];
    assert.equal(res, '__magicSelf__');
  }

  @Get('service')
  async service() {
    let res;

    // general way
    res = this.bean._getBean(ServiceTest).name;
    assert.equal(res, 'serviceTest');

    res = this.bean._getBean('vona-test.service.test').name;
    assert.equal(res, 'serviceTest');

    // this scope
    res = this.scope.service.test.name;
    assert.equal(res, 'serviceTest');

    // general scope
    res = this.bean.scope(__ThisModule__).service.test.name;
    assert.equal(res, 'serviceTest');

    res = this.$scope.vonaTest.service.test.name;
    assert.equal(res, 'serviceTest');
  }
}
