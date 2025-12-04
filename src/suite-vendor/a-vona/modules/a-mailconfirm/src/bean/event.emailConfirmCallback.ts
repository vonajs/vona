import type { TCacheRedisEmailConfirmData } from './cacheRedis.emailConfirm.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventEmailConfirmCallbackData = TCacheRedisEmailConfirmData | undefined;

export type TypeEventEmailConfirmCallbackResult = string;

@Event()
export class EventEmailConfirmCallback extends BeanEventBase<
  TypeEventEmailConfirmCallbackData,
  TypeEventEmailConfirmCallbackResult
> {}
