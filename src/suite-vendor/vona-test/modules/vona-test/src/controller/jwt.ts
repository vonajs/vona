import { BeanBase } from 'vona';
import { Body } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';

@Controller('jwt')
export class ControllerJwt extends BeanBase {
  @Post('login')
  async login(@Body('name') name: string) {
    const payloadData = await this.bean.passport.signinMock(name);
    const jwt = await this.bean.jwt.create(payloadData);
    return jwt;
  }
}
