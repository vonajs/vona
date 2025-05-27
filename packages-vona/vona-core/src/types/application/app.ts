import type { IModule, VonaConfigMeta } from '@cabloy/module-info';
import type { VonaConfig, VonaConfigOptional } from '../config/config.ts';
import type { VonaLocaleOptionalMap } from '../config/locale.ts';
import type { AppMonkeyConstructable } from '../interface/monkey.ts';
import type { VonaConfigEnv } from '../utils/env.ts';

export interface VonaModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export type TypeOptionsModulesMeta = () => Promise<{ modulesMeta: VonaModulesMeta }>;

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
  projectPath: string;
  configMeta: VonaConfigMeta;
}

export interface VonaApplicationOptions {
  name: string;
  projectPath: string;
  modulesMeta: TypeOptionsModulesMeta;
  locales: VonaLocaleOptionalMap;
  config: VonaConfig;
  env: VonaConfigEnv;
  AppMonkey?: AppMonkeyConstructable;
}

export type TypeAppInfoConfig = (appInfo: VonaAppInfo, env: VonaConfigEnv) => VonaConfigOptional;
