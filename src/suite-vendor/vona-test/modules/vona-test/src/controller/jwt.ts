import type { IJwtToken } from 'vona-module-a-jwt';
import { BeanBase } from 'vona';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Body, v } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Get, Post } from 'vona-module-a-web';

@Controller({ path: 'jwt', meta: { mode: 'test' } })
export class ControllerJwt extends BeanBase {
  @Post('login')
  @Api.body(v.object(DtoJwtToken))
  @Public()
  async login(@Body('name') name: string): Promise<IJwtToken> {
    const jwt = await this.bean.passport.signinMock(name);
    return jwt;
  }

  @Get('isAuthenticated')
  isAuthenticated(): boolean {
    return this.bean.passport.isAuthenticated;
  }
}
