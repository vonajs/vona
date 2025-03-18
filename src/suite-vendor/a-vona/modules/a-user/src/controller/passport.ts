import { BeanBase } from 'vona';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Body, v } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';
import { Public } from '../lib/public.ts';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Post('refreshAuthToken')
  @Public()
  @Api.body(v.object(DtoJwtToken))
  async refreshAuthToken(@Body('refreshToken') refreshToken: string): Promise<DtoJwtToken> {
    return await this.bean.passport.refreshAuthToken(refreshToken);
  }
}
