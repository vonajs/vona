import { Bean } from 'vona-module-a-bean';
import { BeanUserBase, IUserBase } from 'vona-module-a-core';
import { TableIdentity } from 'vona-module-a-database';

export interface IUser extends IUserBase {
  id: number;
  name: string;
  avatar?: string;
}

const userAdmin: IUser = {
  id: 1,
  name: 'admin',
};

@Bean()
export class BeanUser extends BeanUserBase {
  public get isAuthenticated(): boolean {
    return this.current !== undefined && TableIdentity.isValid(this.userId);
  }

  public get current(): IUser | undefined {
    return userAdmin;
  }

  public get userId(): TableIdentity {
    return userAdmin.id;
  }

  public get userName(): string {
    return userAdmin.name;
  }

  public get userAvatar(): string | undefined {
    return userAdmin.avatar;
  }
}
