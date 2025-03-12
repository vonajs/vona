import type { TableIdentity } from 'vona-module-a-database';
import { Buffer } from 'node:buffer';
import { pbkdf2, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';
import passwordHash from 'password-hash-salt';

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
    const [method, salt, iterations, keylen, digest, key] = hash.split('$');
    if (!method || !salt || !iterations || !keylen || !digest || !key) return false;
    const key2 = await promisify(pbkdf2)(password, Buffer.from(salt, 'hex'), Number.parseInt(iterations), Number.parseInt(keylen), digest);
    return key2.toString('hex') === key;
  }

  async calcPasswordHash(password: string) {
    const configPasswordHash = this.scope.config.passwordHash;
    return passwordHash.
    // salt
    const salt = await promisify(randomBytes)(configPasswordHash.saltlen);
    // pbkdf2
    const key = await promisify(pbkdf2)(password, salt, configPasswordHash.iterations, configPasswordHash.keylen, configPasswordHash.digest);
    // hash
    return `pbkdf2$${salt.toString('hex')}$${configPasswordHash.iterations}$${configPasswordHash.keylen}$${configPasswordHash.digest}$${key.toString('hex')}`;
  }
}
