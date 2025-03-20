import { BeanBase } from 'vona';
import { Controller, Web } from 'vona-module-a-web';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Web.get('isAuthenticated')
  isAuthenticated(): boolean {
    return this.bean.passport.isAuthenticated;
  }
}
