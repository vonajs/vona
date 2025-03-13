import type { IPassportBase } from '../types/passport.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventSigninData = IPassportBase;

export type TypeEventSigninResult = void;

@Event()
export class EventSignin extends BeanEventBase<TypeEventSigninData, TypeEventSigninResult> {}
