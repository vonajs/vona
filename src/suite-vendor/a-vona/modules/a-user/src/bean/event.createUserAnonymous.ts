import type { IUserBase } from '../types/user.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventCreateUserAnonymousData = IUserBase;

export type TypeEventCreateUserAnonymousResult = void;

@Event()
export class EventCreateUserAnonymous extends BeanEventBase<
  TypeEventCreateUserAnonymousData,
  TypeEventCreateUserAnonymousResult
> {}
