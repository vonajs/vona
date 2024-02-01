export interface IModuleConfigSummerCache {
  enable?: boolean;
  bean?: string | { module: string; name: string } | null;
  config?: 'redis' | 'all' | 'redisWithIgnoreNull' | 'allWithIgnoreNull';
  mode?: 'all' | 'mem' | 'redis';
  mem?: {
    max?: number;
    ttl?: number;
  };
  redis?: {
    ttl: number;
  };
  ignoreNull?: boolean;
}

export interface IModuleConfigSummerCacheBase extends IModuleConfigSummerCache {
  key: string;
  fullKey: string;
  beanFullName: string;
}

export interface IModuleConfigSummerGroup {
  default?: Record<string, IModuleConfigSummerCache>;
  model?: Record<string, IModuleConfigSummerCache>;
}
export interface IModuleConfigSummer {
  group: IModuleConfigSummerGroup;
}
