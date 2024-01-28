import { BeanBase, IModuleMain } from '@cabloy/core';
// import { LocalSessionStore } from './local/sessionStore.js';

export * from './config/index.js';
export * from './resource/index.js';
export * from './meta.js';
export * from './routes.js';

export class Main extends BeanBase implements IModuleMain {
  async moduleLoading(_options): Promise<void> {}
  async moduleLoaded(_options): Promise<void> {
    if (this.app.meta.inApp) {
      // sessionStore
      // (<any>this.app).sessionStore = this.app.bean._getBean(LocalSessionStore);
    }
  }
  async configLoaded(_options): Promise<void> {}
  async metaLoaded(_options): Promise<void> {}
}
