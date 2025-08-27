import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisCaptchaKey = any;
export type TCacheRedisCaptchaData = any;

@CacheRedis()
export class CacheRedisCaptcha
  extends BeanCacheRedisBase<TCacheRedisCaptchaKey, TCacheRedisCaptchaData> {}
