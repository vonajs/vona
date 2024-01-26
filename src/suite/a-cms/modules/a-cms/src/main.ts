import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';
import Watcher from './common/watcher.js';
import AtomCmsBase from './common/atomCmsBase.js';
import beans from './beans.js';
import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';
import models from './models.js';
// meta
import meta from './meta.js';

export default app => {
  // watcher: only in development
  if (app.meta.isLocal) {
    app.meta['a-cms:watcher'] = app.bean._newBean(Watcher);
  }
  return {
    beans,
    routes,
    controllers,
    services,
    models,
    config,
    locales,
    errors,
    meta,
  };
};
