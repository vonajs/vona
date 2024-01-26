import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';

import beans from './beans.js';
import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';
import models from './models.js';
import constants from './config/constants.js';
// meta
import meta from './meta.js';

export default {
  beans,
  routes,
  controllers,
  services,
  models,
  config,
  locales,
  errors,
  constants,
  meta,
};
