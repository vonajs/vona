import { BeanSimple, IModule, IMonkeyModule } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyModule {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(module: IModule) {
    if (this.app.meta.inAgent) return;
    // todo: need to be removed
    // routes
    const routes = module.resource.routes;
    if (routes) {
      for (const route of routes) {
        this.bean.router.register(module.info, route);
      }
    }
    // controllers by decorator
    // only once
    if (module.info.relativeName === __ThisModule__) {
      for (const controller of this.bean.onion.controller.getOnionsEnabled()) {
        this.bean.router.registerController(controller.beanOptions.module, controller.beanOptions.beanClass);
      }
    }
  }
  async configLoaded(_module: IModule, _config) {}
}
