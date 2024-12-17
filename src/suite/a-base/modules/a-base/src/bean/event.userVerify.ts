import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventUserVerifyData = { verifyUser; profileUser };

export type TypeEventUserVerifyResult = void;

@Event()
export class EventUserVerify extends BeanEventBase<TypeEventUserVerifyData, TypeEventUserVerifyResult> {}
