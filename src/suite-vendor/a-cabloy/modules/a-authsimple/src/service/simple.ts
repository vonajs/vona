import type { TableIdentity } from 'vona-module-a-database';
import { Buffer } from 'node:buffer';
import { pbkdf2, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';
import * as passwordHash from 'password-hash-salt';
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

  async verifyPasswordHash(password: string, hash: string) {
    return await passwordHash.verify(password, hash);
  }

  async calcPasswordHash(password: string) {
    const configPasswordHash = this.scope.config.passwordHash;
    return await passwordHash.hash(password, configPasswordHash);
  }
}
