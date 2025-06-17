import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IAuthBase } from './auth.ts';
import type { IRoleBase } from './role.ts';
import type { IUserBase } from './user.ts';

export interface IPassportBase {
  user?: IUserBase;
  auth?: IAuthBase;
  roles?: IRoleBase[];
}

export interface IPassportAdapter {
  isAdmin(user: IUserBase): Promise<boolean>;
  setCurrent(passport: IPassportBase | undefined): Promise<IPassportBase | undefined>;
  serialize(passport: IPassportBase): Promise<IPayloadDataBase>;
  deserialize(payloadData: IPayloadDataBase): Promise<IPassportBase | undefined>;
}

declare module 'vona' {
  export interface ContextState {
    passport?: IPassportBase;
  }
}
