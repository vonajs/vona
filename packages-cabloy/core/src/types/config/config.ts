import { EggAppConfig, PowerPartial } from 'egg';
import { TypeBeanScopeConfig } from '../../index.js';

export interface CabloyConfig extends EggAppConfig {
  disabledModules: string[];
  disabledSuites: string[];
  modules: TypeBeanScopeConfig;
}

export type CabloyConfigOptional = PowerPartial<CabloyConfig>;
