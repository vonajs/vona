import { BeanBase } from 'vona';
import { Controller, Web } from 'vona-module-a-web';

@Controller('menu')
export class ControllerMenu extends BeanBase {
  @Web.get()
  async retrieve(){
    return 'sss'
  }
}
