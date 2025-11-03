import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IAuthBase } from './auth.ts';
import type { IRoleBase } from './role.ts';
import type { IUser } from './user.ts';

export interface IPassport {
  user?: IUser;
  auth?: IAuthBase;
  roles?: IRoleBase[];
}

export interface IPassportAdapter {
  isAdmin(passport: IPassport | undefined): Promise<boolean>;
  setCurrent(passport: IPassport | undefined): Promise<IPassport | undefined>;
  serialize(passport: IPassport): Promise<IPayloadDataBase>;
  deserialize(payloadData: IPayloadDataBase): Promise<IPassport | undefined>;
}

declare module 'vona' {
  export interface ContextState {
    passport?: IPassport;
  }
}
