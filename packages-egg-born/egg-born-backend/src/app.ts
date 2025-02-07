import { VonaApplication, Bootstrap } from 'vona';

export default class AppBootHook {
  app: VonaApplication;
  bootstrap: Bootstrap;

  constructor(app) {
    this.app = app;
    this.bootstrap = new Bootstrap(app);
  }

  configWillLoad() {
    this._prepareMiddlewares();
  }

  async didLoad() {}

  async serverDidReady() {
    await this.bootstrap.start();
    // todo: remove
    await this.bootstrap.socketioReady();
  }

  _prepareMiddlewares() {
    // const app = this.app;
    // // jwt
    // let index = app.config.coreMiddleware.indexOf('session');
    // if (index === -1) {
    //   app.config.coreMiddleware.push('appReady', 'instance', 'cors', 'jwt');
    // } else {
    //   app.config.coreMiddleware.splice(index, 0, 'appReady', 'instance', 'cors', 'jwt');
    // }
    // // siteFile
    // index = app.config.coreMiddleware.indexOf('siteFile');
    // if (index > -1) {
    //   app.config.coreMiddleware.splice(index, 1);
    // }
    // // sessionCaller
    // index = app.config.coreMiddleware.indexOf('session');
    // if (index > -1) {
    //   app.config.coreMiddleware.splice(index + 1, 0, 'sessionCaller');
    // }
  }
}
