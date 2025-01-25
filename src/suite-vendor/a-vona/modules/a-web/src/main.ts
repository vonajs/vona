import { BeanSimple, IModuleMain } from 'vona';
import { EggRouter } from '@eggjs/router';

const SymbolRouter = Symbol('SymbolRouter');

export class Main extends BeanSimple implements IModuleMain {
  private [SymbolRouter]: EggRouter;

  async moduleLoading() {}
  async moduleLoaded() {
    if (this.app.meta.inAgent) return;
    const self = this;
    // router
    Object.defineProperty(this.app, 'router', {
      get() {
        if (!self[SymbolRouter]) {
          self[SymbolRouter] = new EggRouter({ sensitive: true }, this.app);
        }
        return self[SymbolRouter];
      },
    });
    // register controllers
    for (const controller of this.bean.onion.controller.getOnionsEnabled()) {
      this.bean.router.registerController(controller.beanOptions.module, controller.beanOptions.beanClass);
    }
    // middleware: system
    this.app.use(this.app.bean.onion.middlewareSystem.compose(undefined));
    // middleware: router
    this.app.use(this[SymbolRouter].middleware());
  }
  async configLoaded(_config: any) {}
}
