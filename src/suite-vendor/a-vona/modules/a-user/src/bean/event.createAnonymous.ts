import type { IUserBase } from '../types/user.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventCreateAnonymousData = undefined;

export type TypeEventCreateAnonymousResult = Partial<IUserBase>;

@Event()
export class EventCreateAnonymous extends BeanEventBase<
  TypeEventCreateAnonymousData,
  TypeEventCreateAnonymousResult
> {}
