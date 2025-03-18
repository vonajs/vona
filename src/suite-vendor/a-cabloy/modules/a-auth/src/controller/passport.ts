import { BeanBase } from 'vona';
import { Api } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Get } from 'vona-module-a-web';
import { __ThisModule__ } from '../.metadata/this.ts';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Get('callback')
  @Public()
  @Api.exclude()
  callback() {

  }
}
