import { TSummerCacheActionOptions } from 'vona';

export interface ICacheLayeredBase<KEY, DATA> {
  get(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<DATA | null | undefined>;
  mget(
    keysHash: string[],
    keys: KEY[],
    options?: TSummerCacheActionOptions<KEY, DATA>,
  ): Promise<Array<DATA | null | undefined>>;
  del(keyHash: string, key: KEY, options?: TSummerCacheActionOptions<KEY, DATA>): Promise<void>;
}
