import { EggAppConfig } from 'egg';
import { TypeBeanScopeConfig } from '../../index.js';
import { PowerPartial } from '../utils/powerPartial.js';
import { ConfigDevelopment } from './development.js';

// @ts-ignore ignore the throw type check of 'development'
export interface CabloyConfig extends EggAppConfig {
  disabledModules: string[];
  disabledSuites: string[];
  modules: TypeBeanScopeConfig;
  development: ConfigDevelopment;
}

export type CabloyConfigOptional = PowerPartial<CabloyConfig>;
