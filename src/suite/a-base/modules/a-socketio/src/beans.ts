const versionManager = require('./bean/version.manager.js');
const localMessage = require('./bean/local.message.js');
const localMessageClass = require('./bean/local.messageClass.js');
const localProcedure = require('./bean/local.procedure.js');
const localIoMessageBase = require('./bean/local.ioMessageBase.js');
const localIoInner = require('./bean/local.ioInner.js');
const localRedis = require('./bean/local.redis.js');
const broadcastSocketEmit = require('./bean/broadcast.socketEmit.js');
const queueProcess = require('./bean/queue.process.js');
const queueDelivery = require('./bean/queue.delivery.js');
const queuePush = require('./bean/queue.push.js');
const queuePushDirect = require('./bean/queue.pushDirect.js');
const middlewareIOConnection = require('./bean/middleware.io.connection.js');
const middlewareIOPacket = require('./bean/middleware.io.packet.js');
const beanIO = require('./bean/bean.io.js');

module.exports = {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // local
  'local.message': {
    bean: localMessage,
  },
  'local.messageClass': {
    bean: localMessageClass,
  },
  'local.procedure': {
    bean: localProcedure,
  },
  'local.ioMessageBase': {
    bean: localIoMessageBase,
  },
  'local.ioInner': {
    bean: localIoInner,
  },
  'local.redis': {
    bean: localRedis,
  },
  // broadcast
  'broadcast.socketEmit': {
    bean: broadcastSocketEmit,
  },
  // queue
  'queue.process': {
    bean: queueProcess,
  },
  'queue.delivery': {
    bean: queueDelivery,
  },
  'queue.push': {
    bean: queuePush,
  },
  'queue.pushDirect': {
    bean: queuePushDirect,
  },
  // middleware
  'middleware.io.connection': {
    bean: middlewareIOConnection,
  },
  'middleware.io.packet': {
    bean: middlewareIOPacket,
  },
  // global
  io: {
    bean: beanIO,
    global: true,
  },
};
