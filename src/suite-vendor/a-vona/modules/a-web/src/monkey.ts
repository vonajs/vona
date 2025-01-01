import { BeanSimple, IMonkeyModule } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';
import { IModule } from '@cabloy/module-info';

export class Monkey extends BeanSimple implements IMonkeyModule {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(module: IModule) {
    if (this.app.meta.inAgent) return;
    // controllers by decorator
    // only once
    // todo: 如果有系统级别的钩子，那么这里就迁移过去
    if (module.info.relativeName === __ThisModule__) {
      for (const controller of this.bean.onion.controller.getOnionsEnabled()) {
        this.bean.router.registerController(controller.beanOptions.module, controller.beanOptions.beanClass);
      }
    }
  }
  async configLoaded(_module: IModule, _config) {}
}
