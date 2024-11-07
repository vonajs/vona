import { EggAppConfig } from 'egg';
import { IBeanScopeConfig } from '../../index.js';
import { PowerPartial } from '../utils/powerPartial.js';
import { ConfigDevelopment } from './development.js';

// @ts-ignore ignore the throw type check of 'development'
export interface VonaConfig extends EggAppConfig {
  modules: IBeanScopeConfig;
  development: ConfigDevelopment;
  globalPrefix: string;
}

export type VonaConfigOptional = PowerPartial<VonaConfig>;
