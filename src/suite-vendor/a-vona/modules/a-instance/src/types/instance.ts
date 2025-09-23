import type { IInstanceRecord, VonaConfigOptional } from 'vona';
import type { IDatabaseClientRecord } from 'vona-module-a-orm';
import type { EntityInstance } from '../entity/instance.ts';
import 'vona';

export interface ConfigInstanceBase {
  name: keyof IInstanceRecord;
  password?: string;
  title?: string;
  config?: VonaConfigOptional;
  id?: number;
  isolate?: boolean;
  isolateClient?: keyof IDatabaseClientRecord;
}

declare module 'vona' {
  export interface VonaContext {
    instance: EntityInstance;
  }

  export interface VonaConfig {
    instances: ConfigInstanceBase[];
  }
}
