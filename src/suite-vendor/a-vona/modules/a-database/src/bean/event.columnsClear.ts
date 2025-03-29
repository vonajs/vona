import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventColumnsClearData = unknown;

export type TypeEventColumnsClearResult = void;

@Event()
export class EventColumnsClear extends BeanEventBase<
  TypeEventColumnsClearData,
  TypeEventColumnsClearResult
> {}
