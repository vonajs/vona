import { BeanBase, IStartupExecute, Startup } from 'vona';

@Startup({ dependencies: 'a-auth:registerPassport' })
export class StartupRegisterRouters extends BeanBase implements IStartupExecute {
  async execute() {
    // register routers
    await this.app.bean.authProvider._registerRouters();
  }
}
