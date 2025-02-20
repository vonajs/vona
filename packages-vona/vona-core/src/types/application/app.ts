import type { VonaMetaFlavor } from '@cabloy/module-info';

export interface KoaApplicationOptions {
  env?: string | undefined;
  keys?: string[] | undefined;
  proxy?: boolean | undefined;
  subdomainOffset?: number | undefined;
  proxyIpHeader?: string | undefined;
  maxIpsCount?: number | undefined;
  asyncLocalStorage?: boolean | undefined;
}

export interface VonaApplicationOptions extends KoaApplicationOptions {
  baseDir: string;
  flavor: VonaMetaFlavor;
}
