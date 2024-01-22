const config = require('./config/config.js');
const locales = require('./config/locales.js');
const errors = require('./config/errors.js');
const IOMessageBase = require('./bean/local.ioMessageBase.js');
const IOChannelBase = require('./common/ioChannelBase.js');
const beans = require('./beans.js');
const routes = require('./routes.js');
const controllers = require('./controllers.js');
const services = require('./services.js');
const models = require('./models.js');
// meta
const meta = require('./meta.js');

// base
module.meta.class.IOMessageBase = IOMessageBase;
module.meta.class.IOChannelBase = IOChannelBase;

module.exports = {
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
