import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

@Controller()
export class ControllerAuth extends BeanBase<ScopeModule> {
  // return current user auth info
  //   { op:{id},agent:{id},provider}
  async echo() {
    const info = await this.app.bean.auth.echo();
    this.app.success(info);
  }

  async check() {
    const info = await this.app.bean.auth.check();
    this.app.success(info);
  }

  async logout() {
    const info = await this.app.bean.auth.logout();
    this.app.success(info);
  }
}
