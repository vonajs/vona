import type { ICaptchaDataCache } from '../types/captcha.ts';
import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisCaptchaKey = `first:${string}` | `secondary:${string}`;
export type TCacheRedisCaptchaData = ICaptchaDataCache;

@CacheRedis()
export class CacheRedisCaptcha
  extends BeanCacheRedisBase<TCacheRedisCaptchaKey, TCacheRedisCaptchaData> {}
