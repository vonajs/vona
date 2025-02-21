import type { IUserBase } from '../types/user.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventSignoutData = IUserBase;

export type TypeEventSignoutResult = void;

@Event()
export class EventSignout extends BeanEventBase<TypeEventSignoutData, TypeEventSignoutResult> {}
