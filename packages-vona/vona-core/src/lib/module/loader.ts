import { AppMeta } from '../core/meta.js';
import { ModuleTools } from './module.js';
import loadConfig from './config.js';
import loadLocales from './locales.js';
import loadErrors from './errors.js';
import loadConstants from './constant.js';
import loadMessenger from './messenger.js';
import loadClusterApp from './cluster/app.js';
import loadClusterAgent from './cluster/agent.js';
import loadReload from './reload/reload.js';
import loadDevelopment from './reload/development.js';
import loadContextPatch from './contextPatch.js';
import { loadBeans } from './bean/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { AppUtil } from '../utils/util.js';

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

    // messenger
    loadMessenger(app);

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
      loadBeans(app);
      loadLocales(app, modules);
      loadErrors(app, modules);
      loadConstants(app, modules);
      loadContextPatch(app);
      loadClusterApp(app);
      loadReload(app);
    } else {
      await loadConfig(app, modules);
      loadClusterAgent(app);
      loadReload(app);
      loadDevelopment(app);
    }

    // monkey modules
    await moduleTools.monkey('moduleLoaded');
  }
}
