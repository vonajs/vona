import { BeanBase } from 'vona';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Arg, v } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';
import { Passport } from '../lib/passport.ts';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Web.post('refreshAuthToken')
  @Passport.public()
  @Api.body(v.object(DtoJwtToken))
  async refreshAuthToken(@Arg.body('refreshToken') refreshToken: string): Promise<DtoJwtToken> {
    return await this.bean.passport.refreshAuthToken(refreshToken);
  }

  @Web.post('createAuthTokenFromOauthCode')
  @Passport.public()
  @Api.body(v.object(DtoJwtToken))
  async createAuthTokenFromOauthCode(@Arg.body('code') code: string): Promise<DtoJwtToken> {
    return await this.bean.passport.createAuthTokenFromOauthCode(code);
  }
}
