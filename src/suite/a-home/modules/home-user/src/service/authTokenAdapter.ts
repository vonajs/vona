import type { IAuthTokenAdapter, IUserBase } from 'vona-module-a-user';
import type { IPayloadData } from '../types/passport.ts';
import { BeanBase, createHash, uuidv4 } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceAuthTokenAdapter extends BeanBase implements IAuthTokenAdapter {
  async create(payloadData: IPayloadData): Promise<IPayloadData> {
    const token = (payloadData.authId.toString() === '-1') ? createHash(payloadData.authId.toString()) : uuidv4();
    const payloadDataNew = Object.assign({}, payloadData, { token });
    await this.scope.service.redisToken.create(payloadDataNew);
    return payloadDataNew;
  }

  async retrieve(payloadData: IPayloadData): Promise<IPayloadData | undefined> {
    return await this.scope.service.redisToken.retrieve(payloadData);
  }

  async verify(payloadData: IPayloadData): Promise<boolean> {
    return await this.scope.service.redisToken.verify(payloadData);
  }

  async refresh(payloadData: IPayloadData): Promise<void> {
    await this.scope.service.redisToken.refresh(payloadData);
  }

  async remove(payloadData: IPayloadData): Promise<void> {
    await this.scope.service.redisToken.remove(payloadData);
  }

  async removeAll(user: IUserBase): Promise<void> {
    await this.scope.service.redisToken.removeAll(user);
  }
}
