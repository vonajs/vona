import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IAuthBase } from './auth.ts';
import type { IUserBase } from './user.ts';

export interface IPassportBase {
  user?: IUserBase;
  auth?: IAuthBase;
}

export interface IPassportAdapter {
  createUserAnonymous(): Promise<IUserBase>;
  getUserMock(name?: string): Promise<IUserBase | undefined>;
  getUser(user: Partial<IUserBase>): Promise<IUserBase | undefined>;
  updateUser(user: Partial<IUserBase>): Promise<void>;
  getAuth(auth: Partial<IAuthBase>): Promise<IAuthBase | undefined>;
  setCurrent(passport: IPassportBase | undefined): Promise<IPassportBase | undefined>;
  serialize(passport: IPassportBase): Promise<IPayloadDataBase>;
  deserialize(payloadData: IPayloadDataBase): Promise<IPassportBase | undefined>;
}

declare module 'vona' {
  export interface ContextState {
    passport?: IPassportBase;
  }
}
