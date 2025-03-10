import type { IPayloadDataBase } from 'vona-module-a-jwt';

export interface IAuthTokenAdapter {
  create(payloadData: IPayloadDataBase): Promise<IPayloadDataBase>;
  verify(payloadData: IPayloadDataBase): Promise<boolean>;
  refresh(payloadData: IPayloadDataBase): Promise<void>;
  remove(payloadData: IPayloadDataBase): Promise<void>;
}
