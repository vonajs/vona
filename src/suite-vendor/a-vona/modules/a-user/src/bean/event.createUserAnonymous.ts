import { BeanEventBase, Event } from 'vona-module-a-event';
import type { IUserBase } from '../types/user.js';

export type TypeEventCreateUserAnonymousData = IUserBase;

export type TypeEventCreateUserAnonymousResult = void;

@Event()
export class EventCreateUserAnonymous extends BeanEventBase<
  TypeEventCreateUserAnonymousData,
  TypeEventCreateUserAnonymousResult
> {}
