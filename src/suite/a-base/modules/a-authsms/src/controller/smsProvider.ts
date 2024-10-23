import { __ThisModule__ } from '../resource/this.js';
import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';

@Controller()
export class ControllerSmsProvider extends BeanBase<ScopeModule> {
  async list() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.service.smsProvider.list();
    this.ctx.success(res);
  }

  async setCurrent() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.service.smsProvider.setCurrent({
      providerName: this.ctx.request.body.providerName,
    });
    const list = await this.scope.service.smsProvider.list();
    this.ctx.success({ list });
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // params
    const providerName = this.ctx.request.body.providerName;
    const data = this.ctx.request.body.data;
    // validate
    await this.ctx.bean.validation.validate({
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
    this.ctx.success(res);
  }
}
