import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';
import aops from './aops.js';

import beans from './beans.js';
import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';
import models from './models.js';
// meta
import meta from './meta.js';

export default class Main {
  get options() {
    return {
      aops,
      beans,
      routes,
      controllers,
      services,
      models,
      config,
      locales,
      errors,
      meta,
      // hook,
    };
  }

  moduleLoaded(/* { module }*/) {
    if (this.app.meta.inApp) {
      // sessionStore
      // this.app.sessionStore = this.app.bean._getBean(`${moduleInfo.relativeName}.local.sessionStore`);
    }
  }
}
