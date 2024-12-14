import assert from 'assert';
import { BeanBase } from 'vona';
import { Aop } from 'vona-module-a-aspect';

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
