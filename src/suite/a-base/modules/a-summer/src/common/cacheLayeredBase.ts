import { TSummerCacheActionOptions } from 'vona';

export interface ICacheLayeredBase<KEY, DATA> {
  get(_keyHash: string, _key: KEY, _options?: TSummerCacheActionOptions<KEY, DATA>): Promise<DATA | null | undefined>;
}
