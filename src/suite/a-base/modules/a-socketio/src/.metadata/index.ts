/** beans: begin */
export * from '../bean/version.manager.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-socketio.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-socketio' {
  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/message.js';
export * from '../entity/messageClass.js';
export * from '../entity/messageSync.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-socketio:message': IDecoratorEntityOptions;
    'a-socketio:messageClass': IDecoratorEntityOptions;
    'a-socketio:messageSync': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-socketio' {}
/** entity: end */
/** entity: begin */
import { EntityMessage } from '../entity/message.js';
import { EntityMessageClass } from '../entity/messageClass.js';
import { EntityMessageSync } from '../entity/messageSync.js';
export interface IModuleEntity {
  message: EntityMessage;
  messageClass: EntityMessageClass;
  messageSync: EntityMessageSync;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-socketio' {
  export interface EntityMessage {
    column: <K extends keyof Omit<EntityMessage, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityMessage, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityMessageClass {
    column: <K extends keyof Omit<EntityMessageClass, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityMessageClass, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityMessageSync {
    column: <K extends keyof Omit<EntityMessageSync, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityMessageSync, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/message.js';
export * from '../model/messageClass.js';
export * from '../model/messageSync.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-socketio:message': IDecoratorModelOptions;
    'a-socketio:messageClass': IDecoratorModelOptions;
    'a-socketio:messageSync': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-socketio' {
  export interface ModelMessage {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ModelMessageClass {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ModelMessageSync {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** model: end */
/** model: begin */
import { ModelMessage } from '../model/message.js';
import { ModelMessageClass } from '../model/messageClass.js';
import { ModelMessageSync } from '../model/messageSync.js';
export interface IModuleModel {
  message: ModelMessage;
  messageClass: ModelMessageClass;
  messageSync: ModelMessageSync;
}
/** model: end */
/** bean: begin */
export * from '../bean/bean.io.js';
export * from '../bean/bean.ioMessageBase_.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-socketio' {
  export interface BeanIo {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** bean: end */
/** bean: begin */
import { BeanIo } from '../bean/bean.io.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    io: BeanIo;
  }
}
/** bean: end */
/** broadcast: begin */
export * from '../bean/broadcast.socketEmit.js';

import { IDecoratorBroadcastOptions } from 'vona-module-a-broadcast';
declare module 'vona-module-a-broadcast' {
  export interface IBroadcastRecord {
    'a-socketio:socketEmit': IDecoratorBroadcastOptions;
  }
}
declare module 'vona-module-a-socketio' {
  export interface BroadcastSocketEmit {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** broadcast: end */
/** broadcast: begin */
import { BroadcastSocketEmit } from '../bean/broadcast.socketEmit.js';
export interface IModuleBroadcast {
  socketEmit: BroadcastSocketEmit;
}
/** broadcast: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-socketio:redlock': never;
  }
}
declare module 'vona-module-a-socketio' {
  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** meta: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** queue: begin */
export * from '../bean/queue.delivery.js';
export * from '../bean/queue.process.js';
export * from '../bean/queue.push.js';
export * from '../bean/queue.pushDirect.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  export interface IQueueRecord {
    'a-socketio:delivery': IDecoratorQueueOptions;
    'a-socketio:process': IDecoratorQueueOptions;
    'a-socketio:push': IDecoratorQueueOptions;
    'a-socketio:pushDirect': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-a-socketio' {
  export interface QueueDelivery {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface QueueProcess {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface QueuePush {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface QueuePushDirect {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** queue: end */
/** queue: begin */
import { QueueDelivery } from '../bean/queue.delivery.js';
import { QueueProcess } from '../bean/queue.process.js';
import { QueuePush } from '../bean/queue.push.js';
import { QueuePushDirect } from '../bean/queue.pushDirect.js';
export interface IModuleQueue {
  delivery: QueueDelivery;
  process: QueueProcess;
  push: QueuePush;
  pushDirect: QueuePushDirect;
}
/** queue: end */
/** socketConnection: begin */
export * from '../bean/socketConnection.io.js';
import { ISocketConnectionOptionsIo } from '../bean/socketConnection.io.js';
import 'vona';
declare module 'vona-module-a-socket' {
  export interface ISocketConnectionRecord {
    'a-socketio:io': ISocketConnectionOptionsIo;
  }
}
declare module 'vona-module-a-socketio' {
  export interface SocketConnectionIo {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** socketConnection: end */
/** socketPacket: begin */
export * from '../bean/socketPacket.performAction.js';
import { ISocketPacketOptionsPerformAction } from '../bean/socketPacket.performAction.js';
import 'vona';
declare module 'vona-module-a-socket' {
  export interface ISocketPacketRecord {
    'a-socketio:performAction': ISocketPacketOptionsPerformAction;
  }
}
declare module 'vona-module-a-socketio' {
  export interface SocketPacketPerformAction {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** socketPacket: end */
/** service: begin */
export * from '../service/io.js';
export * from '../service/ioInner.js';
export * from '../service/message.js';
export * from '../service/messageClass.js';
export * from '../service/procedure.js';
export * from '../service/redis.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-socketio:io': never;
    'a-socketio:ioInner': never;
    'a-socketio:message': never;
    'a-socketio:messageClass': never;
    'a-socketio:procedure': never;
    'a-socketio:redis': never;
  }
}
declare module 'vona-module-a-socketio' {
  export interface ServiceIo {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ServiceIoInner {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ServiceMessage {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ServiceMessageClass {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ServiceProcedure {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ServiceRedis {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** service: end */
/** service: begin */
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
/** service: end */
/** service: begin */
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
/** service: end */
/** controller: begin */
export * from '../controller/io.js';
export * from '../controller/message.js';
export * from '../controller/messageClass.js';
export * from '../controller/test.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-socketio:io': IDecoratorControllerOptions;
    'a-socketio:message': IDecoratorControllerOptions;
    'a-socketio:messageClass': IDecoratorControllerOptions;
    'a-socketio:test': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-socketio' {
  export interface ControllerIo {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ControllerMessage {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ControllerMessageClass {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }

  export interface ControllerTest {
    /** @internal */
    get scope(): ScopeModuleASocketio;
  }
}
/** controller: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';
import { Scope } from 'vona-module-a-bean';

@Scope()
export class ScopeModuleASocketio extends BeanScopeBase {}

export interface ScopeModuleASocketio {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  entity: IModuleEntity;
  model: IModuleModel;
  broadcast: IModuleBroadcast;
  redlock: MetaRedlock;
  queue: IModuleQueue;
  service: IModuleService;
}

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
