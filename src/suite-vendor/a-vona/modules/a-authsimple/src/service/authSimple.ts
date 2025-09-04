import type { TableIdentity } from 'table-identity';
import * as passwordHash from 'password-hash-salt';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceAuthSimple extends BeanBase {
  async add(userId: TableIdentity | undefined, password: string) {
    // hash
    password = password || this.scope.config.passwordDefault.normal;
    const hash = await this.calcPasswordHash(password);
    // auth simple
    return await this.scope.model.authSimple.insert({ userId, hash });
  }

  async verifyPassword(userId: TableIdentity, password: string): Promise<TableIdentity | undefined> {
    // check
    if (!password) return;
    // authSimple
    const authSimple = await this.scope.model.authSimple.get({ userId });
    if (!authSimple) return;
    // verify
    const res = await this.verifyPasswordHash(password, authSimple.hash);
    if (!res) return;
    // ok
    return authSimple.id;
  }

  async verifyPasswordHash(password: string, hash: string) {
    return await passwordHash.verify(password, hash);
  }

  async calcPasswordHash(password: string) {
    const configPasswordHash = this.scope.config.passwordHash;
    return await passwordHash.hash(password, configPasswordHash);
  }
}
