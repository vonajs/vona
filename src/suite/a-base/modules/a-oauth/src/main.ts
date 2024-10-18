import { BeanSimple, IModuleMain } from 'vona';
// import { LocalSessionStore } from './local/sessionStore.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    if (this.app.meta.inApp) {
      // sessionStore
      // (<any>this.app).sessionStore = this.app.bean._getBean(LocalSessionStore);
    }
  }
  async configLoaded(_config) {}
  async metaLoaded(_meta) {}
}
