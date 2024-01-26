import versionManager from './bean/version.manager.js';
import localMessage from './bean/local.message.js';
import localMessageClass from './bean/local.messageClass.js';
import localProcedure from './bean/local.procedure.js';
import localIoMessageBase from './bean/local.ioMessageBase.js';
import localIoInner from './bean/local.ioInner.js';
import localRedis from './bean/local.redis.js';
import broadcastSocketEmit from './bean/broadcast.socketEmit.js';
import queueProcess from './bean/queue.process.js';
import queueDelivery from './bean/queue.delivery.js';
import queuePush from './bean/queue.push.js';
import queuePushDirect from './bean/queue.pushDirect.js';
import middlewareIOConnection from './bean/middleware.io.connection.js';
import middlewareIOPacket from './bean/middleware.io.packet.js';
import beanIO from './bean/bean.io.js';

export default {
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
