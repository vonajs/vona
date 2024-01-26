import routes from './routes.js';
import services from './services.js';
import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';

// eslint-disable-next-line
import beans from './beans.js';
import controllers from './controllers.js';
import models from './models.js';
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
  meta,
};
