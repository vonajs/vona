import { AppMeta } from './meta.js';
import ModulesToolsFn from './module.js';
import loadRoutes from './route.js';
import loadControllers from './controller.js';
import loadServices from './service.js';
import loadModels from './model.js';
import loadConfig from './config.js';
import loadModuleMeta from './moduleMeta.js';
import loadLocales from './locales.js';
import loadErrors from './errors.js';
import loadConstants from './constant.js';
import { LoadMessenger } from './messenger.js';
import loadRedis from './redis.js';
import loadQueues from './queue/queue.js';
import loadBroadcasts from './broadcast/broadcast.js';
import loadStartups from './startup.js';
import loadSchedules from './schedule.js';
import loadSocketio from './socketio.js';
import loadClusterApp from './cluster/app.js';
import loadClusterAgent from './cluster/agent.js';
import { loadBeans } from './bean/index.js';
import { BeanBase } from './bean/beanBase.js';
import ModuleInfoFn from '../framework/moduleInfo.js';

export class ModuleLoader extends BeanBase {
  async execute() {
    const app = this.app;
    // meta
    const meta = app.bean._newBean(AppMeta);
    app.meta = meta;

    // moduleInfo
    ModuleInfoFn(app);

    // messenger
    LoadMessenger(app);

    // modules
    const modulesTools = ModulesToolsFn(app);
    // load modules
    const modules = modulesTools.loadModules();
    // monkey modules
    modulesTools.monkeyModules('moduleLoading');

    if (meta.inApp) {
      loadConfig(app, modules);
      loadModuleMeta(app, modules);
      loadBeans(app);
      loadLocales(app, modules);
      loadErrors(app, modules);
      loadConstants(app, modules);
      loadRoutes(app, modules);
      loadControllers(app, modules);
      loadServices(app, modules);
      loadModels(app, modules);
      loadRedis(app);
      loadQueues(app, modules);
      loadBroadcasts(app, modules);
      loadStartups(app);
      loadSchedules(app);
      loadSocketio(app);
      loadClusterApp(app);
    } else {
      loadConfig(app, modules);
      loadClusterAgent(app);
    }

    // monkey modules
    modulesTools.monkeyModules('moduleLoaded');
  }
}
