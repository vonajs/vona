export interface IModuleConfigSummerCache {
  bean?: string | { module: string; name: string } | null;
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
  caches: Record<string, IModuleConfigSummerCache>;
}
