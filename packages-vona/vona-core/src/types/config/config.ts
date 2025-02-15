import type { VonaConfigMeta } from '@cabloy/module-info';
import type { EggAppConfig } from 'egg';
import type { IBeanScopeConfig } from '../../index.js';
import type { PowerPartial } from '../utils/powerPartial.js';
import type { ConfigDevelopment } from './development.js';
import type { ConfigInstanceBase } from './instance.js';

// @ts-ignore ignore the throw type check of 'development'
export interface VonaConfig extends EggAppConfig {
  globalPrefix: string;
  publicDir?: string;
  modules: IBeanScopeConfig;
  development: ConfigDevelopment;
  instances: ConfigInstanceBase[];
  configMeta: VonaConfigMeta;
}

export type VonaConfigOptional = PowerPartial<VonaConfig>;
