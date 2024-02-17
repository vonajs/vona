import { BeanBase, Controller } from '@cabloy/core';
import { ScopeModule } from '../../../resource/this.js';
import assert from 'assert';

@Controller()
export class ControllerTestAtomStarLabel extends BeanBase<ScopeModule> {
  async starLabel() {
    // atomClass
    const atomClass = await this.ctx.bean.atomClass.get({ atomClassName: 'party' });
    // user
    const user = this.ctx.state.user.op;

    // add party:star
    const partyKeyDraft = await this.ctx.bean.atom.write({
      atomClass,
      options: { preferredRole: true },
      item: { atomName: 'test:starLabel' },
      user,
    });

    // submit party
    const res = (await this.ctx.bean.atom.submit({
      key: partyKeyDraft,
      options: { ignoreFlow: true },
      user,
    })) as { formal };
    const partyKeyFormal = res.formal.key;

    // get party
    let party = await this.ctx.bean.atom.read({ key: partyKeyFormal, user });
    assert.equal(party.star, null);
    assert.equal(party.labels, null);

    // set star/label
    await this.ctx.bean.atom.star({ key: partyKeyFormal, atom: { star: 1 }, user });
    await this.ctx.bean.atom.labels({ key: partyKeyFormal, atom: { labels: [1] }, user });

    // get party
    party = await this.ctx.bean.atom.read({ key: partyKeyFormal, user });
    assert.equal(party.star, 1);
    assert.equal(party.labels, '[1]');

    // select parties
    let parties = await this.ctx.bean.atom.select({
      user,
      options: {
        star: 1,
        where: { atomName: 'test:starLabel' },
        stage: 'formal',
      },
    });
    assert.equal(parties.length, 1);

    parties = await this.ctx.bean.atom.select({
      user,
      options: {
        label: 1,
        where: { atomName: 'test:starLabel' },
        stage: 'formal',
      },
    });
    assert.equal(parties.length, 1);

    parties = await this.ctx.bean.atom.select({
      user,
      options: {
        label: 2,
        where: { atomName: 'test:starLabel' },
        stage: 'formal',
      },
    });
    assert.equal(parties.length, 0);

    // clear star/label
    await this.ctx.bean.atom.star({ key: partyKeyFormal, atom: { star: 0 }, user });
    await this.ctx.bean.atom.labels({ key: partyKeyFormal, atom: { labels: null }, user });

    // get party
    party = await this.ctx.bean.atom.read({ key: partyKeyFormal, user });
    assert.equal(party.star, null);
    assert.equal(party.labels, null);

    // delete party
    await this.ctx.bean.atom.delete({ key: partyKeyFormal, user });

    // done
    this.ctx.success();
  }
}
