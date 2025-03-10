import type { IJwtToken } from 'vona-module-a-jwt';
import type { IUserBase } from 'vona-module-a-user';
import assert from 'node:assert';
import { BeanBase } from 'vona';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Body, Param, User, v } from 'vona-module-a-openapi';
import { getUserName, Public } from 'vona-module-a-user';
import { Controller, Get, Post } from 'vona-module-a-web';

@Controller({ path: 'passport', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerPassport extends BeanBase {
  @Get('echo/:name')
  @Public()
  echo(@Param('name') name: string, @User() user: IUserBase) {
    assert.equal(name, 'admin');
    assert.equal(getUserName(user), 'admin');
    return { name, user };
  }

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

  @Post('refresh')
  @Api.body(v.object(DtoJwtToken))
  @Public()
  async refresh(@Body('refreshToken') refreshToken: string): Promise<IJwtToken> {
    return await this.bean.passport.refreshAuthToken(refreshToken);
  }

  @Post('logout')
  async logout() {
    return await this.bean.passport.signout();
  }
}
