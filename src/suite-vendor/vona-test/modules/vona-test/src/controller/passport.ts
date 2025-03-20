import type { IJwtToken } from 'vona-module-a-jwt';
import type { IUserBase } from 'vona-module-a-user';
import assert from 'node:assert';
import { BeanBase } from 'vona';
import { DtoJwtToken } from 'vona-module-a-jwt';
import { Api, Arg, v } from 'vona-module-a-openapi';
import { $getUserName, Public } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

@Controller({ path: 'passport', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerPassport extends BeanBase {
  @Web.get('echo/:name')
  @Public()
  echo(@Arg.param('name') name: string, @Arg.user() user: IUserBase) {
    assert.equal(name, 'admin');
    assert.equal($getUserName(user), 'admin');
    return { name, user };
  }

  @Web.post('login')
  @Api.body(v.object(DtoJwtToken))
  @Public()
  async login(@Arg.body('name') name: string): Promise<IJwtToken> {
    const jwt = await this.bean.passport.signinMock(name);
    return jwt;
  }

  @Web.get('isAuthenticated')
  isAuthenticated(): boolean {
    return this.bean.passport.isAuthenticated;
  }

  @Web.post('refresh')
  @Api.body(v.object(DtoJwtToken))
  @Public()
  async refresh(@Arg.body('refreshToken') refreshToken: string): Promise<IJwtToken> {
    return await this.bean.passport.refreshAuthToken(refreshToken);
  }

  @Web.post('logout')
  async logout() {
    return await this.bean.passport.signout();
  }
}
