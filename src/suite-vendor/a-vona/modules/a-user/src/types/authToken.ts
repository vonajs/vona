import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IUserBase } from './user.ts';

export interface IAuthTokenAdapter {
  create(payloadData: IPayloadDataBase): Promise<IPayloadDataBase>;
  retrieve(payloadData: IPayloadDataBase): Promise<IPayloadDataBase | undefined>;
  verify(payloadData: IPayloadDataBase): Promise<boolean>;
  refresh(payloadData: IPayloadDataBase): Promise<void>;
  remove(payloadData: IPayloadDataBase): Promise<void>;
  removeAll(user: IUserBase): Promise<void>;
}
