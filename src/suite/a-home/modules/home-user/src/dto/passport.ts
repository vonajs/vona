import type { DtoAuth } from './auth.ts';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { EntityUser } from '../entity/user.ts';

@Dto()
export class DtoPassport {
  @Api.field()
  user: EntityUser;

  @Api.field()
  auth: DtoAuth;

  @Api.field()
  jwt: DtoJwtToken;
}
