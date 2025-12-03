import type { IModule, VonaConfigMeta } from '@cabloy/module-info';
import type { VonaApplication } from '../../lib/core/application.ts';
import type { VonaConfigOptional } from '../config/config.ts';
import type { VonaLocaleOptionalMap } from '../config/locale.ts';
import type { AppMonkeyConstructable } from '../interface/monkey.ts';
import type { VonaConfigEnv } from '../utils/env.ts';

export interface VonaModulesMeta {
  modules: Record<string, IModule>;
  moduleNames: string[];
}

export type TypeBootstrapOptionsModulesMeta = () => Promise<{ modulesMeta: VonaModulesMeta }>;
export type TypeBootstrapOptionsConfig = () => Promise<{ default: TypeAppInfoConfig[] }>;
export type TypeBootstrapOptionsLocales = () => Promise<{ locales: VonaLocaleOptionalMap }>;

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
  configMeta: VonaConfigMeta;
  modulesMeta: TypeBootstrapOptionsModulesMeta;
  locales: TypeBootstrapOptionsLocales;
  config: TypeBootstrapOptionsConfig;
  env: VonaConfigEnv;
  AppMonkey?: AppMonkeyConstructable;
}

export type TypeAppInfoConfig = (app: VonaApplication, env: VonaConfigEnv) => VonaConfigOptional | Promise<VonaConfigOptional>;
