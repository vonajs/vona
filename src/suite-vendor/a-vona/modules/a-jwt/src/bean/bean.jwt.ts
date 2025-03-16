import type { IJwtClientRecord, IJwtSignOptions, IJwtToken, IPayloadDataBase } from '../types/jwt.ts';
import ms from 'ms';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceJwtClient } from '../service/jwtClient.ts';

@Bean()
export class BeanJwt extends BeanBase {
  get(clientName?: keyof IJwtClientRecord) {
    return this.app.bean._getBeanSelector(ServiceJwtClient, clientName);
  }

  async create(payloadData: IPayloadDataBase, options?: IJwtSignOptions): Promise<IJwtToken> {
    // accessToken
    const accessToken = await this.get('access').sign(payloadData, options);
    // refreshToken
    const refreshToken = await this.get('refresh').sign(payloadData, options);
    // expiresIn
    let expiresIn = this.scope.config.clients.access.signOptions.expiresIn!;
    if (typeof expiresIn === 'string') expiresIn = ms(expiresIn);
    // ok
    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  async createTemp(payloadData: IPayloadDataBase, options?: IJwtSignOptions) {
    return await this.get('access').sign(payloadData, Object.assign({}, options, { temp: true }));
  }

  async createOauth(payloadData: IPayloadDataBase, options?: IJwtSignOptions) {
    return await this.get('oauth').sign(payloadData, options);
  }
}
