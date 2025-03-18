import { BeanBase } from 'vona';
import { UseMiddlewareGlobal } from 'vona-module-a-aspect';
import { Api } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Get } from 'vona-module-a-web';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Get('callback')
  @Public()
  @UseMiddlewareGlobal('a-instance:instance', { enable: false })
  @Api.exclude()
  callback() {
    console.log(this.ctx.host);
  }
}
