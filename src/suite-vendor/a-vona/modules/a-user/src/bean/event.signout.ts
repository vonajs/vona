import { BeanEventBase, Event } from 'vona-module-a-event';
import type { IUserBase } from '../types/user.js';

export type TypeEventSignoutData = IUserBase;

export type TypeEventSignoutResult = void;

@Event()
export class EventSignout extends BeanEventBase<TypeEventSignoutData, TypeEventSignoutResult> {}
