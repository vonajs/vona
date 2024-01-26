import services from './services.js';
import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';

// eslint-disable-next-line
import beans from './beans.js';
import routes from './routes.js';
import controllers from './controllers.js';

export default {
  beans,
  routes,
  controllers,
  services,
  config,
  locales,
  errors,
};
