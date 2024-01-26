import services from './services.js';
import models from './models.js';
import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';
import constants from './config/constants.js';

// eslint-disable-next-line
import beans from './beans.js';
// meta
import meta from './meta.js';
import routes from './routes.js';
import controllers from './controllers.js';

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
