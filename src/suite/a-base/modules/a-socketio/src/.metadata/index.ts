/** beans: begin */
export * from '../bean/bean.io.js';
export * from '../bean/bean.ioMessageBase_.js';
export * from '../bean/broadcast.socketEmit.js';
export * from '../bean/queue.delivery.js';
export * from '../bean/queue.process.js';
export * from '../bean/queue.push.js';
export * from '../bean/queue.pushDirect.js';
export * from '../bean/version.manager.js';
import { BeanIo } from '../bean/bean.io.js';
import { BeanIoMessageBase } from '../bean/bean.ioMessageBase_.js';
import { BroadcastSocketEmit } from '../bean/broadcast.socketEmit.js';
import { QueueDelivery } from '../bean/queue.delivery.js';
import { QueueProcess } from '../bean/queue.process.js';
import { QueuePush } from '../bean/queue.push.js';
import { QueuePushDirect } from '../bean/queue.pushDirect.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    io: BeanIo;
  }

  export interface IBeanRecordGeneral {
    ioMessageBase: BeanIoMessageBase;
    'a-socketio.broadcast.socketEmit': BroadcastSocketEmit;
    'a-socketio.queue.delivery': QueueDelivery;
    'a-socketio.queue.process': QueueProcess;
    'a-socketio.queue.push': QueuePush;
    'a-socketio.queue.pushDirect': QueuePushDirect;
    'a-socketio.version.manager': VersionManager;
  }
}
/** beans: end */
/** socketConnection: begin */
export * from '../bean/socketConnection.io.js';
import { ISocketConnectionOptionsIo } from '../bean/socketConnection.io.js';
import 'vona';
declare module 'vona' {
  export interface ISocketConnectionRecord {
    'a-socketio:io': ISocketConnectionOptionsIo;
  }
}
/** socketConnection: end */
/** socketPacket: begin */
export * from '../bean/socketPacket.performAction.js';
import { ISocketPacketOptionsPerformAction } from '../bean/socketPacket.performAction.js';
import 'vona';
declare module 'vona' {
  export interface ISocketPacketRecord {
    'a-socketio:performAction': ISocketPacketOptionsPerformAction;
  }
}
/** socketPacket: end */
/** entity: begin */
export * from '../entity/message.js';
export * from '../entity/messageClass.js';
export * from '../entity/messageSync.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-socketio:message': IDecoratorEntityOptions;
    'a-socketio:messageClass': IDecoratorEntityOptions;
    'a-socketio:messageSync': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/message.js';
export * from '../model/messageClass.js';
export * from '../model/messageSync.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-socketio:message': IDecoratorModelOptions;
    'a-socketio:messageClass': IDecoratorModelOptions;
    'a-socketio:messageSync': IDecoratorModelOptions;
  }
}
/** model: end */
/** controllers: begin */
export * from '../controller/io.js';
export * from '../controller/message.js';
export * from '../controller/messageClass.js';
export * from '../controller/test.js';
/** controllers: end */
/** entities: begin */
import { EntityMessage } from '../entity/message.js';
import { EntityMessageClass } from '../entity/messageClass.js';
import { EntityMessageSync } from '../entity/messageSync.js';
export interface IModuleEntity {
  message: EntityMessage;
  messageClass: EntityMessageClass;
  messageSync: EntityMessageSync;
}
/** entities: end */
/** models: begin */
import { ModelMessage } from '../model/message.js';
import { ModelMessageClass } from '../model/messageClass.js';
import { ModelMessageSync } from '../model/messageSync.js';
export interface IModuleModel {
  message: ModelMessage;
  messageClass: ModelMessageClass;
  messageSync: ModelMessageSync;
}
/** models: end */
/** services: begin */
export * from '../service/io.js';
export * from '../service/ioInner.js';
export * from '../service/message.js';
export * from '../service/messageClass.js';
export * from '../service/procedure.js';
export * from '../service/redis.js';
import { ServiceIo } from '../service/io.js';
import { ServiceIoInner } from '../service/ioInner.js';
import { ServiceMessage } from '../service/message.js';
import { ServiceMessageClass } from '../service/messageClass.js';
import { ServiceProcedure } from '../service/procedure.js';
import { ServiceRedis } from '../service/redis.js';
export interface IModuleService {
  io: ServiceIo;
  ioInner: ServiceIoInner;
  message: ServiceMessage;
  messageClass: ServiceMessageClass;
  procedure: ServiceProcedure;
  redis: ServiceRedis;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-socketio.service.io': ServiceIo;
    'a-socketio.service.ioInner': ServiceIoInner;
    'a-socketio.service.message': ServiceMessage;
    'a-socketio.service.messageClass': ServiceMessageClass;
    'a-socketio.service.procedure': ServiceProcedure;
    'a-socketio.service.redis': ServiceRedis;
  }
}
/** services: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleASocketio extends BeanScopeBase {}

export interface ScopeModuleASocketio
  extends TypeModuleResource<typeof config, never, never, never, IModuleService, IModuleModel, IModuleEntity> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-socketio': ScopeModuleASocketio;
  }

  export interface IBeanScopeContainer {
    socketio: ScopeModuleASocketio;
  }

  export interface IBeanScopeConfig {
    'a-socketio': ReturnType<typeof config>;
  }
}

/** scope: end */
