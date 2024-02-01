export interface IModuleConfigSummerCache {
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

export interface IModuleConfigSummerGroup {
  default?: Record<string, IModuleConfigSummerCache>;
  model?: Record<string, IModuleConfigSummerCache>;
}
export interface IModuleConfigSummer {
  group: IModuleConfigSummerGroup;
}
