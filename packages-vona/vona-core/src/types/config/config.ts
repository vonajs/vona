import type { VonaConfigMeta } from '@cabloy/module-info';
import type { ConfigLogger, IBeanScopeConfig, VonaConfigEnv } from '../../index.ts';
import type { PowerPartial } from '../utils/powerPartial.ts';
import type { ConfigInstanceBase } from './instance.ts';

// @ts-ignore ignore the throw type check of 'development'
export interface VonaConfig {
  meta: VonaConfigMeta;
  env: VonaConfigEnv;
  server: {
    keys: string[];
    globalPrefix: string;
    publicDir: string;
    loggerDir: string;
    subdomainOffset: number;
    workers: number;
    listen: {
      hostname: string;
      port: number;
      disable: boolean;
    };
    serve: {
      protocol: string;
      host: string;
    };
  };
  proxy: {
    enabled: boolean;
    ipHeaders: string;
    hostHeaders: string;
    protocolHeaders: string;
    maxProxyCount: number;
    maxIpsCount: number;
  };
  logger: ConfigLogger;
  //
  modules: IBeanScopeConfig;
  instances: ConfigInstanceBase[];
}

export type VonaConfigOptional = PowerPartial<VonaConfig>;
