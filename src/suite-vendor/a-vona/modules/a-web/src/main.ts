import { BeanSimple, compose, IModuleMain, Next, VonaContext } from 'vona';
import { EggRouter } from '@eggjs/router';
import { IOnionSlice } from 'vona-module-a-onion';
import {
  IDecoratorMiddlewareSystemOptions,
  IMiddlewareSystemExecute,
  IMiddlewareSystemRecord,
} from 'vona-module-a-aspect';

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
    const middlewares = this.bean.onion.middlewareSystem.getOnionsEnabledWrapped(item => {
      return this._wrapOnion(item);
    });
    this.app.use(compose(middlewares));
    // middleware: router
    this.app.use(this[SymbolRouter].middleware());
  }
  async configLoaded(_config: any) {}

  private _wrapOnion(item: IOnionSlice<IDecoratorMiddlewareSystemOptions, keyof IMiddlewareSystemRecord>) {
    const fn = (_ctx: VonaContext, next: Next) => {
      const options = item.beanOptions.options!;
      if (!this.bean.onion.checkOnionOptionsEnabled(options, this.ctx.path)) {
        return next();
      }
      // execute
      const beanFullName = item.beanOptions.beanFullName;
      const beanInstance = this.app.bean._getBean<IMiddlewareSystemExecute>(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`middlewareSystem bean not found: ${beanFullName}`);
      }
      return beanInstance.execute(options, next);
    };
    fn._name = item.name;
    return fn;
  }
}
