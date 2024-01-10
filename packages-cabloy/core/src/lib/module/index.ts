import loadMeta from './meta.js';
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
import loadMessenger from './messenger.js';
import loadRedis from './redis.js';
import loadQueues from './queue/queue.js';
import loadBroadcasts from './broadcast/broadcast.js';
import loadStartups from './startup.js';
import loadSchedules from './schedule.js';
import loadSocketio from './socketio.js';
import loadClusterApp from './cluster/app.js';
import loadClusterAgent from './cluster/agent.js';
import loadBeans from './bean/index.js';

export default function (loader) {
  // meta
  const meta = loadMeta(loader);

  // bean
  loadBeans.loadBeanContainer(loader);

  // messenger
  loadMessenger(loader);

  // modules
  const modulesTools = ModulesToolsFn(loader);
  // load modules
  const modules = modulesTools.loadModules();
  // monkey modules
  modulesTools.monkeyModules('moduleLoading');

  if (meta.inApp) {
    loadConfig(loader, modules);
    loadModuleMeta(loader, modules);
    loadBeans.loadBeans(loader);
    loadLocales(loader, modules);
    loadErrors(loader, modules);
    loadConstants(loader, modules);
    loadRoutes(loader, modules);
    loadControllers(loader, modules);
    loadServices(loader, modules);
    loadModels(loader, modules);
    loadRedis(loader);
    loadQueues(loader, modules);
    loadBroadcasts(loader, modules);
    loadStartups(loader);
    loadSchedules(loader);
    loadSocketio(loader);
    loadClusterApp(loader);
  } else {
    loadConfig(loader, modules);
    loadClusterAgent(loader);
  }

  // monkey modules
  modulesTools.monkeyModules('moduleLoaded');
}
