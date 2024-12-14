import { EggAppConfig } from 'egg';
import { IBeanScopeConfig } from '../../index.js';
import { PowerPartial } from '../utils/powerPartial.js';
import { ConfigDevelopment } from './development.js';
import { ConfigInstanceBase } from './instance.js';
import { VonaConfigMeta } from 'vona-shared';

// @ts-ignore ignore the throw type check of 'development'
export interface VonaConfig extends EggAppConfig {
  globalPrefix: string;
  modules: IBeanScopeConfig;
  development: ConfigDevelopment;
  instances: ConfigInstanceBase[];
  configMeta: VonaConfigMeta;
}

export type VonaConfigOptional = PowerPartial<VonaConfig>;
