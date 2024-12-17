import assert from 'assert';
import { BeanBase } from 'vona';
import { Aop } from 'vona-module-a-aspect';

@Aop({ match: 'atom', meta: { mode: 'unittest' } })
export class AopAtom extends BeanBase {
  async create(_args, next) {
    const result = await next();
    assert.equal(!!result, true);
    return result;
  }
  async _submitDirect(_args, next) {
    const result = await next();
    assert.equal(!!result, true);
    return result;
  }
}
