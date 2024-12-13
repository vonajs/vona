mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import assert from 'assert';

@Controller()
export class ControllerTestResourceAll extends BeanBase {
  async all() {
    // userIds
    const userIds = this.ctx.cache.mem.get('userIds');
    const userRoot = { id: userIds.root };

    // function all: including widgets
    let resourceStaticsAll = this.ctx.module.meta.base.statics['a-base:resource'].items;
    resourceStaticsAll = resourceStaticsAll.filter(item => item.atomRevision > -1);
    const resourceCount = resourceStaticsAll.length;

    // Tom list all
    let list = await this.app.bean.resource.select({
      options: {
        where: {
          'a.atomStaticKey': {
            op: 'likeRight',
            val: 'test-party:',
          },
        },
        orders: [['a.id', 'asc']],
        page: { index: 0, size: 0 },
        locale: 'en-us',
      },
      user: userRoot,
    });
    assert.equal(list.length, resourceCount);
    assert.equal(!!list[0].atomNameLocale, true);

    // hold first
    const resource_one = list[0];

    // checkRightResource
    const res = await this.app.bean.resource.checkRightResource({
      atomStaticKey: resource_one.atomStaticKey,
      user: userRoot,
    });
    assert.equal(!!res, true);

    // check
    list = await this.app.bean.resource.check({
      atomStaticKeys: [resource_one.atomStaticKey],
      user: userRoot,
    });
    assert.equal(list[0].passed, true);

    // read
    const item = await this.app.bean.resource.read({
      key: { atomId: resource_one.atomId },
      options: { locale: 'en-us' },
      user: userRoot,
    });
    assert.equal(!!item.atomNameLocale, true);

    // done
    this.app.success();
  }
}
