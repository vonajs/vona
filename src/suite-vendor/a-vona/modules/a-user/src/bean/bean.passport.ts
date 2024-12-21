import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { IUserBase } from '../types/user.js';

export function userId(): TableIdentity {
  throw new Error('userId not implemented.');
}

@Bean()
export class BeanPassport extends BeanBase {
  public get isAuthenticated(): boolean {
    throw new Error('isAuthenticated not implemented.');
  }

  public get current(): IUserBase | undefined {
    return this.ctx.state.user;
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
