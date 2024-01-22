const io_0 = require('./bean.io/bean.io_0.js');
const io_delivery = require('./bean.io/bean.io_delivery.js');
const io_publish = require('./bean.io/bean.io_publish.js');
const io_push = require('./bean.io/bean.io_push.js');
const io_save = require('./bean.io/bean.io_save.js');
const io_sockets = require('./bean.io/bean.io_sockets.js');
const io_subscribe = require('./bean.io/bean.io_subscribe.js');

module.exports = module.meta.util.mixinClasses(io_0, [
  io_delivery,
  io_publish,
  io_push,
  io_save,
  io_sockets,
  io_subscribe,
]);
