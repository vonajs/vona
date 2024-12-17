import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventLoginInfoData = { info };

export type TypeEventLoginInfoResult = void;

@Event()
export class EventLoginInfo extends BeanEventBase<TypeEventLoginInfoData, TypeEventLoginInfoResult> {}
