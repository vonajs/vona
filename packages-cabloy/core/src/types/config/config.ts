import { EggAppConfig } from 'egg';
import { TypeBeanScopeConfig } from '../../index.js';
import { PowerPartial } from '../utils/powerPartial.js';

export interface CabloyConfig extends EggAppConfig {
  disabledModules: string[];
  disabledSuites: string[];
  modules: TypeBeanScopeConfig;
}

export type CabloyConfigOptional = PowerPartial<CabloyConfig>;
