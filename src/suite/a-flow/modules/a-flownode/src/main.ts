import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';
import FlowServiceBase from './common/flowServiceBase.js';
import aops from './aops.js';
import beans from './beans.js';
import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';
import models from './models.js';
// meta
import meta from './meta.js';

// FlowServiceBase
module.meta.class.FlowServiceBase = FlowServiceBase;

export default {
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
};
