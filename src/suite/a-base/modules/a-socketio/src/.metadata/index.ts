/** beans: begin */
export * from '../bean/bean.io.js';
export * from '../bean/broadcast.socketEmit.js';
export * from '../bean/middleware.io.connection.js';
export * from '../bean/middleware.io.packet.js';
export * from '../bean/queue.delivery.js';
export * from '../bean/queue.process.js';
export * from '../bean/queue.push.js';
export * from '../bean/queue.pushDirect.js';
export * from '../bean/version.manager.js';
import { BeanIo } from '../bean/bean.io.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    io: BeanIo;
  }
}
/** beans: end */
/** controllers: begin */
export * from '../controller/io.js';
export * from '../controller/message.js';
export * from '../controller/messageClass.js';
export * from '../controller/test.js';
/** controllers: end */
/** entities: begin */
export * from '../entity/message.js';
export * from '../entity/messageClass.js';
export * from '../entity/messageSync.js';
/** entities: end */
/** models: begin */
export * from '../model/message.js';
export * from '../model/messageClass.js';
export * from '../model/messageSync.js';
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
export * from '../service/messageClass_.js';
export * from '../service/procedure.js';
export * from '../service/redis.js';
import { ServiceIo } from '../service/io.js';
import { ServiceIoInner } from '../service/ioInner.js';
import { ServiceMessage } from '../service/message.js';
import { ServiceMessageClass } from '../service/messageClass.js';
import { ServiceMessageClass_ } from '../service/messageClass_.js';
import { ServiceProcedure } from '../service/procedure.js';
import { ServiceRedis } from '../service/redis.js';
export interface IModuleService {
  io: ServiceIo;
  ioInner: ServiceIoInner;
  message: ServiceMessage;
  messageClass: ServiceMessageClass;
  messageClass_: ServiceMessageClass_;
  procedure: ServiceProcedure;
  redis: ServiceRedis;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecord {
    'a-socketio.service.io': ServiceIo;
    'a-socketio.service.ioInner': ServiceIoInner;
    'a-socketio.service.message': ServiceMessage;
    'a-socketio.service.messageClass': ServiceMessageClass;
    'a-socketio.service.messageClass_': ServiceMessageClass_;
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
  extends TypeModuleResource<typeof config, any, any, any, IModuleService, IModuleModel> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-socketio': ScopeModuleASocketio;
  }

  export interface IBeanScopeConfig {
    'a-socketio': ReturnType<typeof config>;
  }
}
/** scope: end */
