mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import assert from 'assert';

@Controller()
export class ControllerTestFeatStats extends BeanBase {
  async stats() {
    // userIds
    const userIds = this.ctx.cache.mem.get('userIds');
    const user = { id: userIds.Tom };

    // old
    let value = await this.app.bean.stats.get({
      name: 'tasksUser',
      nameSub: 'department.project',
      user,
    });
    assert.equal(value, undefined);

    // notify
    await this.app.bean.stats.notifyAsync({
      name: 'tasksUser',
      nameSub: 'department.project',
      user,
    });

    // new
    value = await this.app.bean.stats.get({
      name: 'tasksUser',
      nameSub: 'department.project',
      user,
    });
    assert.equal(value, 1);

    // instance
    value = await this.app.bean.stats.get({
      name: 'tasksInstance',
      user,
    });
    assert.equal(value, 1);

    // done
    this.app.success();
  }

  async plus() {
    this.app.bean.stats.notify({
      name: 'tasksUser',
      nameSub: 'department.project',
    });
    this.app.success();
  }
}
