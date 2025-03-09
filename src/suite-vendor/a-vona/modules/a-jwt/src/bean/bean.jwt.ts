import type { IJwtClientRecord, IJwtPayload, IJwtSignOptions, IJwtToken } from '../types/jwt.ts';
import ms from 'ms';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceJwtClient } from '../service/jwtClient.ts';

@Bean()
export class BeanJwt extends BeanBase {
  get(clientName?: keyof IJwtClientRecord) {
    return this.app.bean._getBeanSelector(ServiceJwtClient, clientName);
  }

  async create(payload: IJwtPayload, options?: IJwtSignOptions): Promise<IJwtToken> {
    // accessToken
    const accessToken = await this.get('access').sign(payload, options);
    // refreshToken
    const refreshToken = await this.get('refresh').sign(payload, options);
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
}
