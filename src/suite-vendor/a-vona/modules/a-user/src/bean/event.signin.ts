import { BeanEventBase, Event } from 'vona-module-a-event';
import type { IUserBase } from '../types/user.js';

export type TypeEventSigninData = IUserBase;

export type TypeEventSigninResult = void;

@Event()
export class EventSignin extends BeanEventBase<TypeEventSigninData, TypeEventSigninResult> {}
