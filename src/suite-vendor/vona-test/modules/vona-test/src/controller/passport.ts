import type { IUserBase } from 'vona-module-a-user';
import assert from 'node:assert';
import { BeanBase } from 'vona';
import { Api, Param, User } from 'vona-module-a-openapi';
import { userName } from 'vona-module-a-user';
import { Controller, Get } from 'vona-module-a-web';

@Controller({ path: 'passport', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerPassport extends BeanBase {
  @Get('echo/:name')
  echo(@Param('name') name: string, @User() user: IUserBase) {
    assert.equal(name, 'admin');
    assert.equal(userName(user), 'admin');
    return { name, user };
  }
}
