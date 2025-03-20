import { BeanBase } from 'vona';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Body, v } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';
import { Public } from '../lib/public.ts';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Web.post('refreshAuthToken')
  @Public()
  @Api.body(v.object(DtoJwtToken))
  async refreshAuthToken(@Body('refreshToken') refreshToken: string): Promise<DtoJwtToken> {
    return await this.bean.passport.refreshAuthToken(refreshToken);
  }

  @Web.post('createAuthTokenFromOauthCode')
  @Public()
  @Api.body(v.object(DtoJwtToken))
  async createAuthTokenFromOauthCode(@Body('code') code: string): Promise<DtoJwtToken> {
    return await this.bean.passport.createAuthTokenFromOauthCode(code);
  }
}
