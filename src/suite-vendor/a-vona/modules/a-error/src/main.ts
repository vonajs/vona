import { BeanSimple, IModuleMain, VonaContext } from 'vona';
import { onerror, type OnerrorOptions } from 'koa-onerror';
import { accepts } from './lib/utils.js';
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
      if (config.appErrorFilter && !config.appErrorFilter(err, ctx)) return;
      // do nothing
    });

    const errorOptions: OnerrorOptions = {
      // support customize accepts function
      accepts(this: VonaContext) {
        const fn = config.accepts || accepts;
        return fn(this as any);
      },
      js(err, ctx: VonaContext) {
        errorOptions.json!.call(ctx, err, ctx);

        if (ctx.createJsonpBody) {
          ctx.createJsonpBody(ctx.body);
        }
      },
    };

    // support customize error response
    const keys = ['all', 'html', 'json', 'text', 'js'];
    for (const type of keys) {
      if (config[type]) {
        Reflect.set(errorOptions, type, config[type]);
      }
    }
    onerror(app, errorOptions);
  }
  async configLoaded(_config: any) {}
}
