import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';

import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';
import models from './models.js';
// meta
import meta from './meta.js';

export default {
  routes,
  controllers,
  services,
  models,
  config,
  locales,
  errors,
  meta,
};
