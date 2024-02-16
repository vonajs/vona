import { BeanBase, IModule, IMonkeyModule } from '@cabloy/core';
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

export class Monkey extends BeanBase implements IMonkeyModule {
  async moduleLoading(_moduleSelf: IModule, module: IModule) {
    if (module.info.relativeName !== 'test-party') return;
    // route
    monkeyRoute(module, 'test/monkey/monkeyee/test', {
      module: __ThisModule__,
      name: 'monkeyer',
    });
  }
  async moduleLoaded(_moduleSelf: IModule, _module: IModule) {}
  async configLoaded(_moduleSelf: IModule, module: IModule, config) {
    if (module.info.relativeName !== 'test-party') return;
    // config
    monkeyConfig(module, config);
  }
  async metaLoaded(_moduleSelf: IModule, _module: IModule, _meta) {}
}
