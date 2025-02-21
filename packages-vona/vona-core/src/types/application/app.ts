import type { VonaConfigMeta } from '@cabloy/module-info';
import type { VonaConfig, VonaConfigOptional } from '../config/config.ts';
import type { VonaLocaleOptionalMap } from '../config/locale.ts';
import type { VonaModulesMeta } from '../interface/bootstrap.ts';
import type { AppMonkeyConstructable } from '../interface/monkey.ts';

export interface KoaApplicationOptions {
  env?: string | undefined;
  keys?: string[] | undefined;
  proxy?: boolean | undefined;
  subdomainOffset?: number | undefined;
  proxyIpHeader?: string | undefined;
  maxIpsCount?: number | undefined;
  asyncLocalStorage?: boolean | undefined;
}

export interface VonaAppInfo {
  name: string;
  baseDir: string;
  configMeta: VonaConfigMeta;
}

export interface VonaApplicationOptions {
  name: string;
  baseDir: string;
  modulesMeta: VonaModulesMeta;
  locales: VonaLocaleOptionalMap;
  config: VonaConfig;
  AppMonkey?: AppMonkeyConstructable;
}

export type TypeAppInfoConfig = (appInfo: VonaAppInfo) => VonaConfigOptional | Promise<VonaConfigOptional>;
