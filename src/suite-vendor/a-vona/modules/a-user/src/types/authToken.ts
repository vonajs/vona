import type { IPayloadData } from 'vona-module-a-jwt';
import type { IUser } from './user.ts';

export interface IAuthTokenAdapter {
  create(payloadData: IPayloadData): Promise<IPayloadData>;
  retrieve(payloadData: IPayloadData): Promise<IPayloadData | undefined>;
  verify(payloadData: IPayloadData): Promise<boolean>;
  refresh(payloadData: IPayloadData): Promise<void>;
  remove(payloadData: IPayloadData): Promise<void>;
  removeAll(user: IUser): Promise<void>;
}
