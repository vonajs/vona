import { BeanBase } from 'vona';
import { TableIdentity } from 'vona-module-a-database';
import { IUserBase } from '../types/user.js';

export class BeanUserBase extends BeanBase {
  public get isAuthenticated(): boolean {
    throw new Error('isAuthenticated not implemented.');
  }

  public get current(): IUserBase | undefined {
    throw new Error('current not implemented.');
  }

  public get userId(): TableIdentity {
    throw new Error('userId not implemented.');
  }

  public get userName(): string {
    throw new Error('userName not implemented.');
  }

  public get userAvatar(): string | undefined {
    throw new Error('userAvatar not implemented.');
  }
}
