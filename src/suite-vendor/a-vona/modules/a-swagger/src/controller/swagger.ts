import { BeanBase } from 'vona';
import { Public } from 'vona-module-a-user';
import { Controller, Get } from 'vona-module-a-web';

@Controller('//swagger')
export class ControllerSwagger extends BeanBase {
  @Get()
  @Public()
  @Response.contentType('application/json')
  index() {
    return 'Hello Swagger';
  }
}
