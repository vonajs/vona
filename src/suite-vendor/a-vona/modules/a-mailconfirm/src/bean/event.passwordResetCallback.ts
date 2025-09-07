import type { TCacheRedisPasswordResetData } from './cacheRedis.passwordReset.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventPasswordResetCallbackData = TCacheRedisPasswordResetData | null | undefined;

export type TypeEventPasswordResetCallbackResult = string;

@Event()
export class EventPasswordResetCallback extends BeanEventBase<
  TypeEventPasswordResetCallbackData,
  TypeEventPasswordResetCallbackResult
> {}
