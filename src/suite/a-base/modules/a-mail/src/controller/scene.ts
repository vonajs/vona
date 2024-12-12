import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerScene extends BeanBase {
  async list() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.scene.list();
    this.app.success(res);
  }

  async save() {
    // check demo
    this.app.bean.util.checkDemo();
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
    await this.scope.service.scene.save({
      sceneName,
      data: data2,
    });
    // ok
    const list = await this.scope.service.scene.list();
    const res = list[sceneName];
    this.app.success(res);
  }

  async delete() {
    // check demo
    this.app.bean.util.checkDemo();
    await this.scope.service.scene.delete({
      sceneName: this.ctx.request.body.sceneName,
    });
    const list = await this.scope.service.scene.list();
    this.app.success({ list });
  }

  async add() {
    // check demo
    this.app.bean.util.checkDemo();
    await this.scope.service.scene.add({
      sceneName: this.ctx.request.body.sceneName,
      data: this.ctx.request.body.data,
    });
    const list = await this.scope.service.scene.list();
    this.app.success({ list });
  }
}
