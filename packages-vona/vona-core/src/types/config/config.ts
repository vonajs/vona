import type { VonaConfigMeta } from '@cabloy/module-info';
import type { EggAppConfig } from 'egg';
import type { IBeanScopeConfig } from '../../index.ts';
import type { PowerPartial } from '../utils/powerPartial.ts';
import type { ConfigDevelopment } from './development.ts';
import type { ConfigInstanceBase } from './instance.ts';

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
