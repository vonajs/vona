import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../../../resource/this.js';
import assert from 'assert';

const atomStaticKey = '--modelWhere--test--';
const __rows = [
  { atomStaticKey, atomName: 'atom-one', atomStage: 0 },
  { atomStaticKey, atomName: 'atom-two', atomStage: 1 },
  { atomStaticKey, atomName: 'atom-three', atomStage: 2 },
];

@Controller()
export class ControllerTestFeatModelWhere extends BeanBase<ScopeModule> {
  async modelWhere() {
    await this._modelWhere();
    this.ctx.success();
  }

  async _modelWhere() {
    // model
    const model = this.getScope('a-base').model.atom;

    // delete: force clear old data
    await model.delete({ atomStaticKey });

    // insert one row
    await model.insert(__rows[0]);
    // insert multi rows
    await model.insert(__rows.slice(1));

    // select: or false/false
    let list = await model.select({
      where: {
        atomStaticKey: [atomStaticKey],
        __or__: [false, false],
      },
    });
    assert.equal(list.length, 0);
    // select: or false/clause
    list = await model.select({
      where: {
        atomStaticKey: [atomStaticKey],
        __or__: [false, { atomName: 'atom-two' }],
      },
    });
    assert.equal(list.length, 1);
    // select: or true/clause
    list = await model.select({
      where: {
        atomStaticKey: [atomStaticKey],
        __or__: [true, { atomName: 'atom-two' }],
      },
    });
    assert.equal(list.length, 3);

    // select: and true/true
    list = await model.select({
      where: {
        atomStaticKey: [atomStaticKey],
        __and__: [true, true],
      },
    });
    assert.equal(list.length, 3);
    // select: and true/clause
    list = await model.select({
      where: {
        atomStaticKey: [atomStaticKey],
        __and__: [true, { atomName: 'atom-two' }],
      },
    });
    assert.equal(list.length, 1);
    // select: and false/clause
    list = await model.select({
      where: {
        atomStaticKey: [atomStaticKey],
        __and__: [false, { atomName: 'atom-two' }],
      },
    });
    assert.equal(list.length, 0);

    // delete
    await model.delete({ atomStaticKey });

    // count
    const count = await model.count({ where: { atomStaticKey } });
    assert.equal(count.toNumber(), 0);
  }
}
