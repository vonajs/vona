/** beans: begin */
export * from '../bean/bean.stats.js';
export * from '../bean/io.message.stats.js';
export * from '../bean/stats.deps.js';
export * from '../bean/version.manager.js';
import { BeanStats } from '../bean/bean.stats.js';
import { IoMessageStats } from '../bean/io.message.stats.js';
import { StatsDeps } from '../bean/stats.deps.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    stats: BeanStats;
  }

  export interface IBeanRecordGeneral {
    'a-stats.io.message.stats': IoMessageStats;
    'a-stats.stats.deps': StatsDeps;
    'a-stats.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-stats' {
  export interface BeanStats {
    get scope(): ScopeModuleAStats;
  }

  export interface IoMessageStats {
    get scope(): ScopeModuleAStats;
  }

  export interface StatsDeps {
    get scope(): ScopeModuleAStats;
  }

  export interface VersionManager {
    get scope(): ScopeModuleAStats;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/stats.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona' {
  export interface IEntityRecord {
    'a-stats:stats': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-stats' {}
/** entity: end */
/** entity: begin */
import { EntityStats } from '../entity/stats.js';
export interface IModuleEntity {
  stats: EntityStats;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-stats' {
  export interface EntityStats {
    column: <K extends keyof Omit<EntityStats, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityStats, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/stats.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona' {
  export interface IModelRecord {
    'a-stats:stats': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-stats' {
  export interface ModelStats {
    get scope(): ScopeModuleAStats;
  }
}
/** model: end */
/** model: begin */
import { ModelStats } from '../model/stats.js';
export interface IModuleModel {
  stats: ModelStats;
}
/** model: end */
/** queue: begin */
export * from '../bean/queue.stats.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona' {
  export interface IQueueRecord {
    'a-stats:stats': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-a-stats' {
  export interface QueueStats {
    get scope(): ScopeModuleAStats;
  }
}
/** queue: end */
/** queue: begin */
import { QueueStats } from '../bean/queue.stats.js';
export interface IModuleQueue {
  stats: QueueStats;
}
/** queue: end */
/** service: begin */
export * from '../service/stats.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-stats:stats': never;
  }
}
declare module 'vona-module-a-stats' {
  export interface ServiceStats {
    get scope(): ScopeModuleAStats;
  }
}
/** service: end */
/** service: begin */
import { ServiceStats } from '../service/stats.js';
export interface IModuleService {
  stats: ServiceStats;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-stats.service.stats': ServiceStats;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/stats.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona' {
  export interface IControllerRecord {
    'a-stats:stats': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-stats' {
  export interface ControllerStats {
    get scope(): ScopeModuleAStats;
  }
}
/** controller: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleBean, BeanScopeUtil, TypeModuleConfig } from 'vona';

@Scope()
export class ScopeModuleAStats extends BeanScopeBase {}

export interface ScopeModuleAStats {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  entity: IModuleEntity;
  model: IModuleModel;
  queue: IModuleQueue;
  service: IModuleService;
}

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
