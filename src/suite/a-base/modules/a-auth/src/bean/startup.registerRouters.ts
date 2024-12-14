import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup({ dependencies: 'a-auth:registerPassport' })
export class StartupRegisterRouters extends BeanBase implements IStartupExecute {
  async execute() {
    // register routers
    await this.app.bean.authProvider._registerRouters();
  }
}
