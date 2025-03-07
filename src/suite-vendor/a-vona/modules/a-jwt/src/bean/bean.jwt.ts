import type { IJwtClientRecord } from '../types/jwt.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { ServiceJwtClient } from '../service/jwtClient.ts';

@Bean()
export class BeanJwt extends BeanBase {
  get(clientName?: keyof IJwtClientRecord) {
    return this.app.bean._getBeanSelector(ServiceJwtClient, clientName);
  }
}
