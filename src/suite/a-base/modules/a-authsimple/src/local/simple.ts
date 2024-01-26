import { Local, BeanBase } from '@cabloy/core';

import util from 'util';
import passwordFn from 'password-hash-and-salt'; // should compile

@Local()
export class LocalSimple extends BeanBase {
  get modelAuthSimple() {
    return this.ctx.model.module(__ThisModule__).authSimple;
  }

  async verify({ userId, password }) {
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

  async verifyPassword({ password, hash }) {
    const _password = passwordFn(password.toString());
    const verifyFn = util.promisify(_password.verifyAgainst);
    return await verifyFn.call(_password, hash);
  }

  async calcPassword({ password }) {
    const _password = passwordFn(password.toString());
    const hashFn = util.promisify(_password.hash);
    return await hashFn.call(_password);
  }
}
