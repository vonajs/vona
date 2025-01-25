import { BeanSimple, IModuleMain } from 'vona';
import { EggRouter } from '@eggjs/router';

const SymbolRouter = Symbol('SymbolRouter');

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    if (this.app.meta.inAgent) return;
    const self = this;
    // router
    Object.defineProperty(this.app, 'router', {
      get() {
        if (!self[SymbolRouter]) {
          self[SymbolRouter] = new EggRouter({ sensitive: true }, this.app); //self.app.bean._getBean('a-web.service.router');
          self.app.use(self[SymbolRouter].middleware());
        }
        return self[SymbolRouter];
      },
    });
    // register controllers
    for (const controller of this.bean.onion.controller.getOnionsEnabled()) {
      this.bean.router.registerController(controller.beanOptions.module, controller.beanOptions.beanClass);
    }
  }
  async configLoaded(_config: any) {}
}
