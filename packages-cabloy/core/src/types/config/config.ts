import { EggAppConfig, PowerPartial } from 'egg';

export interface CabloyConfig extends EggAppConfig {}

export type CabloyConfigOptional = PowerPartial<CabloyConfig>;
