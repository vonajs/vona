import { __ThisModule__ } from '../.metadata/this.js';
mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerSmsProvider extends BeanBase {
  async list() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.smsProvider.list();
    this.app.success(res);
  }

  async setCurrent() {
    // check demo
    this.app.bean.util.checkDemo();
    await this.scope.service.smsProvider.setCurrent({
      providerName: this.ctx.request.body.providerName,
    });
    const list = await this.scope.service.smsProvider.list();
    this.app.success({ list });
  }

  async save() {
    // check demo
    this.app.bean.util.checkDemo();
    // params
    const providerName = this.ctx.request.body.providerName;
    const data = this.ctx.request.body.data;
    // validate
    await this.app.bean.validation.validate({
      module: __ThisModule__,
      validator: providerName,
      schema: null,
      data,
      filterOptions: true,
    });
    // save
    await this.scope.service.smsProvider.save({
      providerName,
      data,
    });
    // ok
    const list = await this.scope.service.smsProvider.list();
    const res = list[providerName];
    this.app.success(res);
  }
}
