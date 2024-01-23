import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAAuthsms } from '../index.js';
const moduleInfo = module.info;

@Controller()
export class ControllerSmsProvider extends BeanBase {
  async list() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.ctx.service.smsProvider.list();
    this.ctx.success(res);
  }

  async setCurrent() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.ctx.service.smsProvider.setCurrent({
      providerName: this.ctx.request.body.providerName,
    });
    const list = await this.ctx.service.smsProvider.list();
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
    await this.ctx.service.smsProvider.save({
      providerName,
      data,
    });
    // ok
    const list = await this.ctx.service.smsProvider.list();
    const res = list[providerName];
    this.ctx.success(res);
  }
}
