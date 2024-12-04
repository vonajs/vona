/** beans: begin */
export * from '../bean/bean.stats.js';
export * from '../bean/io.message.stats.js';
export * from '../bean/queue.stats.js';
export * from '../bean/stats.deps.js';
export * from '../bean/version.manager.js';
import { BeanStats } from '../bean/bean.stats.js';
import { IoMessageStats } from '../bean/io.message.stats.js';
import { QueueStats } from '../bean/queue.stats.js';
import { StatsDeps } from '../bean/stats.deps.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    stats: BeanStats;
  }

  export interface IBeanRecordGeneral {
    'a-stats.io.message.stats': IoMessageStats;
    'a-stats.queue.stats': QueueStats;
    'a-stats.stats.deps': StatsDeps;
    'a-stats.version.manager': VersionManager;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/stats.js';

import { IDecoratorEntityOptions } from 'vona';
declare module 'vona' {
  export interface IEntityRecord {
    'a-stats:stats': IDecoratorEntityOptions;
  }
}
/** entity: end */
/** model: begin */
export * from '../model/stats.js';

import { IDecoratorModelOptions } from 'vona';
declare module 'vona' {
  export interface IModelRecord {
    'a-stats:stats': IDecoratorModelOptions;
  }
}
/** model: end */
/** controllers: begin */
export * from '../controller/stats.js';
/** controllers: end */
/** entities: begin */
import { EntityStats } from '../entity/stats.js';
export interface IModuleEntity {
  stats: EntityStats;
}
/** entities: end */
/** models: begin */
import { ModelStats } from '../model/stats.js';
export interface IModuleModel {
  stats: ModelStats;
}
/** models: end */
/** services: begin */
export * from '../service/stats.js';
import { ServiceStats } from '../service/stats.js';
export interface IModuleService {
  stats: ServiceStats;
}
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-stats.service.stats': ServiceStats;
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
export class ScopeModuleAStats extends BeanScopeBase {}

export interface ScopeModuleAStats
  extends TypeModuleResource<typeof config, never, never, never, IModuleService, IModuleModel, IModuleEntity> {}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-stats': ScopeModuleAStats;
  }

  export interface IBeanScopeContainer {
    stats: ScopeModuleAStats;
  }

  export interface IBeanScopeConfig {
    'a-stats': ReturnType<typeof config>;
  }
}

/** scope: end */
