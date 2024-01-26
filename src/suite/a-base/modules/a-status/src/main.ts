import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';

// eslint-disable-next-line
import beans from './beans.js';
import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';

export default app => {
  // models
  import models from './models.js';
  return {
    beans,
    routes,
    controllers,
    services,
    models,
    config,
    locales,
    errors,
  };
};
