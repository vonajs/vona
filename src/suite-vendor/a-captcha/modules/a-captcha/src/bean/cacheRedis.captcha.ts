import type { ICaptchaDataCache } from '../types/captcha.ts';
import { BeanCacheRedisBase, CacheRedis } from 'vona-module-a-cache';

export type TCacheRedisCaptchaKey = string;
export type TCacheRedisCaptchaData = ICaptchaDataCache;

@CacheRedis({ disableTransactionCompensate: true })
export class CacheRedisCaptcha
  extends BeanCacheRedisBase<TCacheRedisCaptchaKey, TCacheRedisCaptchaData> {}
