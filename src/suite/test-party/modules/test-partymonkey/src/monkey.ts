import { BeanSimple, IModule, IMonkeyModule } from '@cabloy/core';
import { __ThisModule__ } from './resource/this.js';

function monkeyRoute(module: IModule, routePath, routeController) {
  const route = module.resource.routes.find(item => item.path === routePath);
  if (route) {
    route.controller = routeController;
  }
}

function monkeyConfig(_module, config) {
  config.monkeyed = true;
}

export class Monkey extends BeanSimple implements IMonkeyModule {
  async moduleLoading(module: IModule) {
    if (module.info.relativeName !== 'test-party') return;
    // route
    monkeyRoute(module, 'test/monkey/monkeyee/test', {
      module: __ThisModule__,
      name: 'monkeyer',
    });
  }
  async moduleLoaded(_module: IModule) {}
  async configLoaded(module: IModule, config) {
    if (module.info.relativeName !== 'test-party') return;
    // config
    monkeyConfig(module, config);
  }
  async metaLoaded(_module: IModule, _meta) {}
}
