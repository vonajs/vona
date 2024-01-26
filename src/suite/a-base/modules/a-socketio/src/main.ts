import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';
import IOMessageBase from './bean/local.ioMessageBase.js';
import IOChannelBase from './common/ioChannelBase.js';
import beans from './beans.js';
import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';
import models from './models.js';
// meta
import meta from './meta.js';

// base
module.meta.class.IOMessageBase = IOMessageBase;
module.meta.class.IOChannelBase = IOChannelBase;

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
