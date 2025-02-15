import type { IUserBase } from '../types/user.js';
import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventSigninData = IUserBase;

export type TypeEventSigninResult = void;

@Event()
export class EventSignin extends BeanEventBase<TypeEventSigninData, TypeEventSigninResult> {}
