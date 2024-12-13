mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';
import assert from 'assert';

@Controller()
export class ControllerTestItemOnlyAll extends BeanBase {
  atomClass: any;

  async all() {
    const totalTimes = 1;
    const timeStart = new Date().getTime() / 1000;
    for (let i = 0; i < totalTimes; i++) {
      await this.__all();
      console.log(`-----all time: ${i}`);
    }
    const timeEnd = new Date().getTime() / 1000;
    console.log(`-----all time used: ${timeEnd - timeStart}s`);
    // done
    this.app.success();
  }
  async __all() {
    // atomClass
    const atomClass = await this.app.bean.atomClass.get({
      module: 'a-useronline',
      atomClassName: 'userOnlineHistory',
    });
    this.atomClass = atomClass;
    // userIds
    const userIds = this.ctx.cache.mem.get('userIds');
    const userTom = (await this._getUser({ userIds, userName: 'Tom' }))!;
    // const userRoot = await this._getUser({userIds, userName:'root'});

    // delete: force clear old data
    const modelHistory = this.$scope.useronline.model.userOnlineHistory;
    await modelHistory.delete({ isLogin: 2 });

    // user->atom
    await this._testCheckList(
      userIds,
      [
        ['Tom', 0],
        ['root', 0],
        ['', 0],
      ],
      (actual, expected, userName) => {
        assert.equal(actual, expected, userName);
      },
    );

    // add useronline
    const itemKey = await this.app.bean.atom.write({
      atomClass,
      item: {
        userId: userTom.id,
        isLogin: 2,
      },
      options: {
        ignoreValidate: true,
      },
    });

    await this._testCheckList(
      userIds,
      [
        ['Tom', 0],
        ['root', 1],
        ['', 1],
      ],
      (actual, expected, userName) => {
        assert.equal(actual, expected, userName);
      },
    );

    // get useronline
    const userOnline = await this.app.bean.atom.read({ key: itemKey, atomClass });
    assert.equal(userOnline.userId, userTom.id);

    // checkRightRead
    const checkRightReads = [
      ['Tom', itemKey.atomId, false],
      ['root', itemKey.atomId, true],
    ];
    for (const [userName, atomId, right] of checkRightReads) {
      const user = await this._getUser({ userIds, userName });
      const res = await this.app.bean.atom.checkRightRead({
        atom: { id: atomId },
        atomClass,
        user,
      });
      assert.equal(!!res, right, userName);
    }

    // checkRightWrite
    const checkRightWrites = [
      ['Tom', itemKey.atomId, false],
      ['root', itemKey.atomId, false],
    ];
    for (const [userName, atomId, right] of checkRightWrites) {
      const user = await this._getUser({ userIds, userName });
      const res = await this.app.bean.atom.checkRightAction({
        atom: { id: atomId },
        atomClass,
        action: 'write',
        user,
      });
      assert.equal(!!res, right, userName);
    }

    // checkRightDelete
    const checkRightDeletes = [
      ['Tom', itemKey.atomId, false],
      ['root', itemKey.atomId, true],
    ];
    for (const [userName, atomId, right] of checkRightDeletes) {
      const user = await this._getUser({ userIds, userName });
      const res = await this.app.bean.atom.checkRightAction({
        atom: { id: atomId },
        atomClass,
        action: 'delete',
        user,
      });
      assert.equal(!!res, right, userName);
    }

    // checkRightCreate
    const checkRightCreates: [string, boolean][] = [
      ['Tom', false],
      ['root', false],
    ];
    for (const [userName, right] of checkRightCreates) {
      const user = await this._getUser({ userIds, userName });
      const res = await this.app.bean.atom.checkRightCreate({
        atomClass,
        user,
      });
      assert.equal(!!res, right, userName);
    }

    // delete useronline
    await this.app.bean.atom.delete({
      key: itemKey,
      atomClass,
    });

    await this._testCheckList(
      userIds,
      [
        ['Tom', 0],
        ['root', 0],
        ['', 0],
      ],
      (actual, expected, userName) => {
        assert.equal(actual, expected, userName);
      },
    );
  }

  async _testCheckList(userIds, userAtoms, cb) {
    for (const [userName, atomCountExpected] of userAtoms) {
      const user = await this._getUser({ userIds, userName });
      const list = await this.app.bean.atom.select({
        atomClass: this.atomClass,
        options: {
          where: {
            isLogin: 2,
          },
          orders: undefined,
          page: undefined,
        },
        user,
      });
      // callback
      cb(list.length, atomCountExpected, userName);
    }
  }

  async _getUser({ userIds, userName }: any) {
    if (!userName) return;
    const userId = userIds && userIds[userName];
    if (userId) return { id: userId };
    return await this.app.bean.user.get({ userName });
  }
}
