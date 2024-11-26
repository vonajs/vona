import { Aop, BeanBase } from 'vona';
import assert from 'assert';

@Aop({ match: 'atom', meta: { mode: 'unittest' } })
export class AopAtom extends BeanBase {
  async create(context, next) {
    await next();
    assert.equal(!!context.result, true);
  }
  async _submitDirect(context, next) {
    await next();
    assert.equal(!!context.result, true);
  }
}
