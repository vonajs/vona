import type { VonaConfigMeta } from '@cabloy/module-info';
import type { VonaConfig } from '../config/config.ts';

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

export interface VonaApplicationOptions extends KoaApplicationOptions, VonaAppInfo {
  config: VonaConfig;
}
