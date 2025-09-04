import type { IUserBase } from '../types/user.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventActivateData = IUserBase;

export type TypeEventActivateResult = void;

@Event()
export class EventActivate extends BeanEventBase<
  TypeEventActivateData,
  TypeEventActivateResult
> {}
