import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventUserAddData = { user };

export type TypeEventUserAddResult = void;

@Event()
export class EventUserAdd extends BeanEventBase<TypeEventUserAddData, TypeEventUserAddResult> {}
