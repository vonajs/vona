import type { TableIdentity } from 'vona-module-a-database';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceSimple extends BeanBase {
  async verify(userId: TableIdentity, password: string): Promise<boolean> {
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
