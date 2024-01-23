import { BeanBase, Controller, Use } from '@cabloy/core';
import { ScopeModuleAMail } from '../index.js';

@Controller()
export class ControllerScene extends BeanBase {
  @Use()
  scope: ScopeModuleAMail;

  async list() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const res = await this.scope.local.scene.list();
    this.ctx.success(res);
  }

  async save() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // adjust
    const sceneName = this.ctx.request.body.sceneName;
    const data = this.ctx.request.body.data;
    const data2 = {
      title: data.transport.title,
      transport: {
        ...data.transport,
        auth: data.auth,
        logger: data.extra.logger,
        debug: data.extra.debug,
      },
      defaults: data.defaults,
    };
    delete data2.transport.title;
    // save
    await this.scope.local.scene.save({
      sceneName,
      data: data2,
    });
    // ok
    const list = await this.scope.local.scene.list();
    const res = list[sceneName];
    this.ctx.success(res);
  }

  async delete() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.local.scene.delete({
      sceneName: this.ctx.request.body.sceneName,
    });
    const list = await this.scope.local.scene.list();
    this.ctx.success({ list });
  }

  async add() {
    // check demo
    this.ctx.bean.util.checkDemo();
    await this.scope.local.scene.add({
      sceneName: this.ctx.request.body.sceneName,
      data: this.ctx.request.body.data,
    });
    const list = await this.scope.local.scene.list();
    this.ctx.success({ list });
  }
}
