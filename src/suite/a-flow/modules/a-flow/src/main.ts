import config from './config/config.js';
import locales from './config/locales.js';
import errors from './config/errors.js';
import constants from './config/constants.js';
import FlowBehaviorBase from './common/flowBehaviorBase.js';
import FlowNodeBase from './common/flowNodeBase.js';
import FlowEdgeBase from './common/flowEdgeBase.js';
import aops from './aops.js';
import beans from './beans.js';
import routes from './routes.js';
import controllers from './controllers.js';
import services from './services.js';
import models from './models.js';
// meta
import meta from './meta.js';

// FlowBehaviorBase/FlowNodeBase/FlowEdgeBase
module.meta.class.FlowBehaviorBase = FlowBehaviorBase;
module.meta.class.FlowNodeBase = FlowNodeBase;
module.meta.class.FlowEdgeBase = FlowEdgeBase;

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
