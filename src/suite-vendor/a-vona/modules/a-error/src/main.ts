import { BeanSimple, IModuleMain } from 'vona';
import { onerror, type OnerrorOptions } from 'koa-onerror';
import { __ThisModule__ } from './.metadata/this.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    const config = this.bean.scope(__ThisModule__).config;
    const app = this.app;
    app.on('error', (err, ctx) => {
      if (!ctx) {
        ctx = app.currentContext || app.createAnonymousContext();
      }
      if (config.error.appErrorFilter && !config.error.appErrorFilter(err, ctx)) return;
      // do nothing
    });

    const errorOptions: OnerrorOptions = {};

    // support customize error response
    const keys = ['accepts', 'all', 'html', 'json', 'text', 'js'];
    for (const type of keys) {
      if (config.onerror[type]) {
        Reflect.set(errorOptions, type, config.onerror[type]);
      }
    }
    onerror(app, errorOptions);
  }

  async configLoaded(_config: any) {}
}
