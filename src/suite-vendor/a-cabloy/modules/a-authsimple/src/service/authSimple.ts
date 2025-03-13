import type { TableIdentity } from 'vona-module-a-database';
import * as passwordHash from 'password-hash-salt';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceAuthSimple extends BeanBase {
  async add(userId: TableIdentity | undefined, password: string) {
    // hash
    password = password || this.scope.config.passwordDefault.normal;
    const hash = await this.calcPasswordHash(password);
    // auth simple
    const res = await this.scope.model.authSimple.insert({ userId, hash });
    return res[0];
  }

  async verify(userId: TableIdentity, password: string): Promise<boolean> {
    // check
    if (!password) return false;
    // authSimple
    const authSimple = await this.scope.model.authSimple.get({ userId });
    if (!authSimple) return false;
    // verify
    const res = await this.verifyPasswordHash(password, authSimple.hash);
    if (!res) return false;
    // ok
    return true;
  }

  async verifyPasswordHash(password: string, hash: string) {
    return await passwordHash.verify(password, hash);
  }

  async calcPasswordHash(password: string) {
    const configPasswordHash = this.scope.config.passwordHash;
    return await passwordHash.hash(password, configPasswordHash);
  }
}
