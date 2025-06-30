import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IAuthTokenAdapter } from '../types/authToken.ts';
import type { IUserBase } from '../types/user.ts';
import { BeanBase, createHash, uuidv4 } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceAuthTokenAdapter extends BeanBase implements IAuthTokenAdapter {
  async create(payloadData: IPayloadDataBase): Promise<IPayloadDataBase> {
    const authIdStr = this._getAuthId(payloadData)?.toString();
    const token = (authIdStr === '-1') ? createHash(authIdStr) : uuidv4();
    const payloadDataNew = Object.assign({}, payloadData, { token });
    await this.scope.service.redisToken.create(payloadDataNew);
    return payloadDataNew;
  }

  async retrieve(payloadData: IPayloadDataBase): Promise<IPayloadDataBase | undefined> {
    return await this.scope.service.redisToken.retrieve(payloadData);
  }

  async verify(payloadData: IPayloadDataBase): Promise<boolean> {
    return await this.scope.service.redisToken.verify(payloadData);
  }

  async refresh(payloadData: IPayloadDataBase): Promise<void> {
    await this.scope.service.redisToken.refresh(payloadData);
  }

  async remove(payloadData: IPayloadDataBase): Promise<void> {
    await this.scope.service.redisToken.remove(payloadData);
  }

  async removeAll(user: IUserBase): Promise<void> {
    await this.scope.service.redisToken.removeAll(user);
  }

  private _getAuthId(payloadData: IPayloadDataBase) {
    return payloadData[this.scope.config.payloadData.fields.authId];
  }
}
