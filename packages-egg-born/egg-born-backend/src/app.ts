import { CabloyApplication } from '@cabloy/core';

export default class AppBootHook {
  app: CabloyApplication;

  constructor(app) {
    this.app = app;
    this._adjustMiddlewares();
  }

  async beforeClose() {
    // 请将您的 app.beforeClose 中的代码置于此处。
  }

  _adjustMiddlewares() {
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
