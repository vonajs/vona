import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAAuthsms } from '../index.js';
const moduleInfo = module.info;

@Controller()
export class ControllerSmsProvider extends BeanBase {
  @Use()
  scope: ScopeModuleAAuthsms;

  async list() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.smsProvider.list();
    this.ctx.success(res);
  }

  async setCurrent() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.local.smsProvider.setCurrent({
      providerName: this.ctx.request.body.providerName,
    });
    const list = await this.scope.local.smsProvider.list();
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
      module: moduleInfo.relativeName,
      validator: providerName,
      schema: null,
      data,
      filterOptions: true,
    });
    // save
    await this.scope.local.smsProvider.save({
      providerName,
      data,
    });
    // ok
    const list = await this.scope.local.smsProvider.list();
    const res = list[providerName];
    this.ctx.success(res);
  }
}
