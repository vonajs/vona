import type { IJwtClientRecord, IJwtPayload, IJwtSignOptions } from '../types/jwt.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceJwtClient } from '../service/jwtClient.ts';

@Bean()
export class BeanJwt extends BeanBase {
  get(clientName?: keyof IJwtClientRecord) {
    return this.app.bean._getBeanSelector(ServiceJwtClient, clientName);
  }

  async create(payload: IJwtPayload, options?: IJwtSignOptions) {
    // accessToken
    const accessToken = await this.get('access').sign(payload, options);
    // refreshToken
    const refreshToken = await this.get('refresh').sign(payload, options);
    // expiresIn
    const expiresIn = this.scope.config.clients.access.signOptions.expiresIn;
    // ok
    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }
}
