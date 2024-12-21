import assert from 'assert';
import { BeanBase } from 'vona';
import { userName, type IUserBase } from 'vona-module-a-user';
import { Param, User } from 'vona-module-a-validation';
import { Controller, Get } from 'vona-module-a-web';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Get('echo/:name')
  echo(@Param('name') name: string, @User() user: IUserBase) {
    assert.equal(name, 'admin');
    assert.equal(userName(user), 'admin');
    return { name, user };
  }
}
