import AtomBase from './bean/bean.atomBase.js';
import ModelCache from './common/modelCache.js';

import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';
import aops from './aops.js';
import beans from './beans.js';

// eslint-disable-next-line
import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';
import models from './models.js';
import constants from './config/constants.js';
// meta
import meta from './meta.js';

// base
module.meta.class.AtomBase = AtomBase;
// modelCache
module.meta.class.ModelCache = ModelCache;

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
  constants,
  meta,
};
