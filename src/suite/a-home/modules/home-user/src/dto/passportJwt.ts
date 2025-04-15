import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoPassport } from './passport.ts';

@Dto()
export class DtoPassportJwt {
  @Api.field()
  passport: DtoPassport;

  @Api.field()
  jwt: DtoJwtToken;
}
