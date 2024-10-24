import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestAtomAll extends BeanBase<ScopeModule> {
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
    this.ctx.success();
  }
  async __all() {
    // atomClass
    const atomClass = await this.ctx.bean.atomClass.get({ atomClassName: 'party' });
    this.atomClass = atomClass;
    // userIds
    const userIds = this.ctx.cache.mem.get('userIds');
    const userTom = await this._getUser({ userIds, userName: 'Tom' });
    // user->atom
    await this._testCheckList(
      'formal',
      userIds,
      [
        ['Tom', 0],
        ['Jane', 0],
        ['Jimmy', 0],
        ['Smith', 0],
        ['', 0],
      ],
      (actual, expected, userName) => {
        assert.equal(actual, expected, userName);
      },
    );

    // Tom add party
    const partyKeyDraft = await this.ctx.bean.atom.write({
      atomClass,
      options: { preferredRole: true },
      item: { atomName: 'test:all', personCount: 3 },
      user: userTom,
    });

    await this._testCheckList(
      'draft',
      userIds,
      [
        ['Tom', 1],
        ['Jane', 0],
        ['Jimmy', 0],
        ['Smith', 0],
        ['', 0],
      ],
      (actual, expected, userName) => {
        assert.equal(actual, expected, userName);
      },
    );

    // Tom enable(submit) party
    const res = (await this.ctx.bean.atom.submit({
      key: partyKeyDraft,
      options: { ignoreFlow: true },
      user: userTom,
    })) as { formal };
    const partyKeyFormal = res.formal.key;

    await this._testCheckList(
      'formal',
      userIds,
      [
        ['Tom', 1],
        ['Jane', 1],
        ['Jimmy', 1],
        ['Smith', 1],
        ['', 1],
      ],
      (actual, expected, userName) => {
        assert.equal(actual, expected, userName);
      },
    );

    // Tom update party
    await this.ctx.bean.atom.write({
      key: partyKeyDraft,
      item: { personCount: 8 },
      user: userTom,
    });

    // Tom get party
    const party = await this.ctx.bean.atom.read({ key: partyKeyDraft, user: userTom });
    assert.equal(party.personCount, 8);

    // Tom list party
    const parties = await this.ctx.bean.atom.select({
      atomClass,
      options: {
        where: { atomName: { val: 'test:all', op: 'likeRight' } },
        orders: [['a.createdAt', 'desc']],
        page: { index: 0, size: 0 },
        stage: 'formal',
      },
      user: userTom,
    });
    assert.equal(parties.length, 1);

    // checkRightRead
    const checkRightReads = [['Tom', partyKeyFormal.atomId, true]];
    for (const [userName, atomId, right] of checkRightReads) {
      const user = await this._getUser({ userIds, userName });
      const res = await this.ctx.bean.atom.checkRightRead({
        atom: { id: atomId },
        user,
      });
      assert.equal(!!res, right, userName);
    }

    // checkRightWrite
    const checkRightWrites = [
      ['Tom', partyKeyFormal.atomId, true],
      ['Tomson', partyKeyFormal.atomId, false],
    ];
    for (const [userName, atomId, right] of checkRightWrites) {
      const user = await this._getUser({ userIds, userName });
      const res = await this.ctx.bean.atom.checkRightAction({
        atom: { id: atomId },
        action: 'write',
        user,
      });
      assert.equal(!!res, right, userName);
    }

    // checkRightDelete
    const checkRightDeletes = [
      ['Tom', partyKeyFormal.atomId, true],
      ['Tomson', partyKeyFormal.atomId, false],
    ];
    for (const [userName, atomId, right] of checkRightDeletes) {
      const user = await this._getUser({ userIds, userName });
      const res = await this.ctx.bean.atom.checkRightAction({
        atom: { id: atomId },
        action: 'delete',
        user,
      });
      assert.equal(!!res, right, userName);
    }

    // checkRightCreate
    const checkRightCreates: [string, boolean][] = [
      ['Tom', true],
      ['Jimmy', true],
      ['Smith', false],
    ];
    for (const [userName, right] of checkRightCreates) {
      const user = await this._getUser({ userIds, userName });
      const res = await this.ctx.bean.atom.checkRightCreate({
        atomClass,
        user,
      });
      assert.equal(!!res, right, userName);
    }

    // // checkRightAction:review(flag=1)
    // const checkRightActions_1 = [[ 'Tom', partyKey.atomId, false ], [ 'Jane', partyKey.atomId, true ]];
    // for (const [ userName, atomId, right ] of checkRightActions_1) {
    //   const res = await this.ctx.bean.atom.checkRightAction({
    //     atom: { id: atomId },
    //     action: 101,
    //     user: { id: userIds[userName] },
    //   });
    //   assert.equal(!!res, right, userName);
    // }

    // // action: review
    // await this.ctx.bean.atom.action({
    //   action: 101,
    //   key: partyKey,
    //   user: { id: userIds.Jane },
    // });

    // // checkRightAction:review(flag=2)
    // const checkRightActions_2 = [[ 'Tom', partyKey.atomId, false ], [ 'Jane', partyKey.atomId, false ]];
    // for (const [ userName, atomId, right ] of checkRightActions_2) {
    //   const res = await this.ctx.bean.atom.checkRightAction({
    //     atom: { id: atomId },
    //     action: 101,
    //     user: { id: userIds[userName] },
    //   });
    //   assert.equal(!!res, right, userName);
    // }

    // // action: review again
    // await this.ctx.bean.atom.action({
    //   action: 101,
    //   key: partyKey,
    //   user: { id: userIds.Jane },
    // });

    // Tom delete party
    await this.ctx.bean.atom.delete({
      key: partyKeyFormal,
      user: userTom,
    });

    await this._testCheckList(
      'formal',
      userIds,
      [
        ['Tom', 0],
        ['Jane', 0],
        ['Jimmy', 0],
        ['Smith', 0],
        ['', 0],
      ],
      (actual, expected, userName) => {
        assert.equal(actual, expected, userName);
      },
    );
  }

  async _testCheckList(stage, userIds, userAtoms, cb) {
    for (const [userName, atomCountExpected] of userAtoms) {
      const user = await this._getUser({ userIds, userName });
      const list = await this.ctx.bean.atom.select({
        atomClass: this.atomClass,
        options: {
          where: {
            atomName: 'test:all',
          },
          orders: undefined,
          page: undefined,
          stage,
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
    return await this.ctx.bean.user.get({ userName });
  }
}
