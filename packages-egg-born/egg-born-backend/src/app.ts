import { CabloyApplication, Bootstrap } from '@cabloy/core';

export default class AppBootHook {
  app: CabloyApplication;
  bootstrap: Bootstrap;

  constructor(app) {
    this.app = app;
    this.bootstrap = new Bootstrap(app);
  }

  configWillLoad() {
    this._prepareMiddlewares();
  }

  async didLoad() {
    await this.bootstrap.loadModules();
  }

  async serverDidReady() {
    await this.bootstrap.versionReady();
    await this.bootstrap.socketioReady();
  }

  _prepareMiddlewares() {
    const app = this.app;
    // jwt
    let index = app.config.coreMiddleware.indexOf('session');
    if (index === -1) {
      app.config.coreMiddleware.push('appReady', 'instance', 'jwt');
    } else {
      app.config.coreMiddleware.splice(index, 0, 'appReady', 'instance', 'jwt');
    }
    // siteFile
    index = app.config.coreMiddleware.indexOf('siteFile');
    if (index > -1) {
      app.config.coreMiddleware.splice(index, 1);
    }
    // bodyCrypto
    index = app.config.coreMiddleware.indexOf('bodyParser');
    if (index > -1) {
      app.config.coreMiddleware.splice(index + 1, 0, 'bodyCrypto');
    }
    // // sessionCaller
    // index = app.config.coreMiddleware.indexOf('session');
    // if (index > -1) {
    //   app.config.coreMiddleware.splice(index + 1, 0, 'sessionCaller');
    // }
  }
}
