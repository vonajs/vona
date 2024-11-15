import { EggAppConfig } from 'egg';
import { ConfigMetadata, IBeanScopeConfig } from '../../index.js';
import { PowerPartial } from '../utils/powerPartial.js';
import { ConfigDevelopment } from './development.js';
import { ConfigCors } from './cors.js';
import { ConfigInstanceBase } from './instance.js';

// @ts-ignore ignore the throw type check of 'development'
export interface VonaConfig extends EggAppConfig {
  globalPrefix: string;
  modules: IBeanScopeConfig;
  development: ConfigDevelopment;
  cors: ConfigCors;
  metadata: ConfigMetadata;
  instances: ConfigInstanceBase[];
}

export type VonaConfigOptional = PowerPartial<VonaConfig>;
