import type { IPassportBase } from '../types/user.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventSignoutData = IPassportBase;

export type TypeEventSignoutResult = void;

@Event()
export class EventSignout extends BeanEventBase<TypeEventSignoutData, TypeEventSignoutResult> {}
