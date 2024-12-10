import { AppMeta } from '../core/meta.js';
import { ModuleTools } from './module.js';
import loadOnions from './onion.js';
import loadRoutes from './route.js';
import loadConfig from './config.js';
import loadModuleMeta from './moduleMeta.js';
import loadLocales from './locales.js';
import loadErrors from './errors.js';
import loadConstants from './constant.js';
import loadMessenger from './messenger.js';
import loadBroadcasts from './broadcast/broadcast.js';
import loadClusterApp from './cluster/app.js';
import loadClusterAgent from './cluster/agent.js';
import loadReload from './reload/reload.js';
import loadDevelopment from './reload/development.js';
import loadContextPatch from './contextPatch.js';
import { loadBeans } from './bean/index.js';
import { BeanSimple } from '../bean/beanSimple.js';

export class ModuleLoader extends BeanSimple {
  async execute() {
    const app = this.app;
    // meta
    const meta = app.bean._newBean(AppMeta);
    app.meta = meta;

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
      loadOnions(app);
      await loadModuleMeta(app, modules);
      loadBeans(app);
      loadLocales(app, modules);
      loadErrors(app, modules);
      loadConstants(app, modules);
      loadRoutes(app, modules);
      loadContextPatch(app);
      loadBroadcasts(app, modules);
      loadClusterApp(app);
      loadReload(app);
    } else {
      await loadConfig(app, modules);
      loadOnions(app);
      await loadModuleMeta(app, modules);
      loadClusterAgent(app);
      loadReload(app);
      loadDevelopment(app);
    }

    // monkey modules
    await moduleTools.monkey('moduleLoaded');
  }
}
