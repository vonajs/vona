import type { DtoJwtToken } from 'vona-module-a-jwt';
import type { EntityAuth } from '../entity/auth.ts';
import type { EntityUser } from '../entity/user.ts';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

@Dto()
export class DtoPassport {
  @Api.field()
  user: EntityUser;

  @Api.field()
  auth: EntityAuth;

  @Api.field()
  jwt: DtoJwtToken;
}
