import { ScopeModule } from '../resource/this.js';
import { Local, BeanBase } from 'vona';

import util from 'util';
import passwordFn from 'password-hash-and-salt'; // should compile

@Local()
export class LocalSimple extends BeanBase<ScopeModule> {
  get modelAuthSimple() {
    return this.scope.model.authSimple;
  }

  async verify({ userId, password }: any) {
    // check
    if (!password) return false;
    // authSimple
    const authSimple = await this.modelAuthSimple.get({
      userId,
    });
    if (!authSimple) return false;
    // verify
    const res = await this.verifyPassword({ password, hash: authSimple.hash });
    if (!res) return false;
    // ok
    return authSimple;
  }

  async verifyPassword({ password, hash }: any) {
    const _password = passwordFn(password.toString());
    const verifyFn = util.promisify(_password.verifyAgainst);
    return await verifyFn.call(_password, hash);
  }

  async calcPassword({ password }: any) {
    const _password = passwordFn(password.toString());
    const hashFn = util.promisify(_password.hash);
    return await hashFn.call(_password);
  }
}
