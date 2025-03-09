import type { IJwtToken } from 'vona-module-a-jwt';
import { BeanBase } from 'vona';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Body, v } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';

@Controller('jwt')
export class ControllerJwt extends BeanBase {
  @Post('login')
  @Api.body(v.object(DtoJwtToken))
  async login(@Body('name') name: string): Promise<IJwtToken> {
    const payloadData = await this.bean.passport.signinMock(name);
    const jwt = await this.bean.jwt.create(payloadData);
    return jwt;
  }
}
