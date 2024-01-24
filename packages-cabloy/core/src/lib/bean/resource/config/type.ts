import { CabloyApplication } from '../../../../index.js';

export type TypeModuleConfig<T extends (app: CabloyApplication) => object> = ReturnType<T>;

export interface IModuleConfigBroadcast {
  bean: string | { module: string; name: string };
}

export interface IModuleConfigMiddleware {
  bean: string | { module: string; name: string };
  global?: boolean;
  dependencies?: string | string[];
}

export interface IModuleConfigQueue {
  bean: string | { module: string; name: string };
}

export interface IModuleConfigStartup {
  bean: string | { module: string; name: string };
  instance?: boolean;
  debounce?: boolean;
}

export interface IModuleConfigSummerCache {
  bean: string | { module: string; name: string } | null;
  mode: 'all' | 'mem' | 'redis';
  mem?: {
    max: number;
  };
  redis?: {
    ttl: number;
  };
  ignoreNull?: boolean;
}

export interface IModuleConfigSummer {
  enable?: boolean;
  caches: Record<string, IModuleConfigSummerCache>;
}

export interface IModuleConfigSchedule {
  bean: string | { module: string; name: string };
  repeat: {
    every: number;
  };
  disable?: boolean;
}
