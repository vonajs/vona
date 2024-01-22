const AtomBase = require('./bean/bean.atomBase.js');
const ModelCache = require('./common/modelCache.js');

const config = require('./config/config.js');
const locales = require('./config/locales.js');
const errors = require('./config/errors.js');
const aops = require('./aops.js');
const beans = require('./beans.js');

// eslint-disable-next-line
const routes = require('./routes.js');
const controllers = require('./controllers.js');
const services = require('./services.js');
const models = require('./models.js');
const constants = require('./config/constants.js');
// meta
const meta = require('./meta.js');

// base
module.meta.class.AtomBase = AtomBase;
// modelCache
module.meta.class.ModelCache = ModelCache;

module.exports = {
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
