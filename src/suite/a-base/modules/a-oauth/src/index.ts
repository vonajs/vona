import { BeanBase, IModule, IModuleMain } from '@cabloy/core';
// import { LocalSessionStore } from './local/sessionStore.js';

export * from './config/index.js';
export * from './resource/index.js';
export * from './meta.js';
export * from './routes.js';

import './typings/core/index.js';

export class Main extends BeanBase implements IModuleMain {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {
    if (this.app.meta.inApp) {
      // sessionStore
      // (<any>this.app).sessionStore = this.app.bean._getBean(LocalSessionStore);
    }
  }
  async configLoaded(_module: IModule, _config) {}
  async metaLoaded(_module: IModule, _meta) {}
}
