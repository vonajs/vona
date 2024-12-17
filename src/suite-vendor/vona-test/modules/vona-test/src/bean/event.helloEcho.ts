import { BeanEventBase, Event } from 'vona-module-a-event';

export type TypeEventHelloEchoArgs = [text: string];

export type TypeEventHelloEchoResult = string;

@Event()
export class EventHelloEcho extends BeanEventBase<TypeEventHelloEchoArgs, TypeEventHelloEchoResult> {}
