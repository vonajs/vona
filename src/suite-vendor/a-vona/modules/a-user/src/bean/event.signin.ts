import type { IPassport } from '../types/passport.ts';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventSigninData = IPassport;

export type TypeEventSigninResult = void;

@Event()
export class EventSignin extends BeanEventBase<TypeEventSigninData, TypeEventSigninResult> {}
