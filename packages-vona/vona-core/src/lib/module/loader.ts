import { BeanSimple } from '../bean/beanSimple.ts';
import { AppMeta } from '../core/meta.ts';
import { AppUtil } from '../utils/util.ts';
import loadConfig from './config.ts';
import loadConstants from './constant.ts';
import loadErrors from './errors.ts';
import loadLocales from './locales.ts';
import { ModuleTools } from './module.ts';

export class ModuleLoader extends BeanSimple {
  async execute() {
    const app = this.app;
    // util
    const util = app.bean._newBean(AppUtil);
    app.util = util;
    // meta
    const meta = app.bean._newBean(AppMeta);
    app.meta = meta;
    app.meta.celjs = await import('cel-js');

    // modules
    const moduleTools = app.bean._newBean(ModuleTools);
    // prepare
    const modules = await moduleTools.prepare();
    // load modules
    await moduleTools.load();
    // monkey modules
    await moduleTools.monkey('moduleLoading');

    if (meta.inApp) {
      await loadConfig(app, modules);
      loadLocales(app, modules);
      loadErrors(app, modules);
      loadConstants(app, modules);
    }

    // monkey modules
    await moduleTools.monkey('moduleLoaded');
  }
}
