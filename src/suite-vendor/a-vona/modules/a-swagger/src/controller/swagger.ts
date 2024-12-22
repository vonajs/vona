import { BeanBase } from 'vona';
import { Public } from 'vona-module-a-user';
import { Controller, Get, Res } from 'vona-module-a-web';

@Controller('//swagger')
export class ControllerSwagger extends BeanBase {
  @Get()
  @Public()
  @Res.contentType('application/json')
  index() {
    return 'Hello Swagger';
  }
}
