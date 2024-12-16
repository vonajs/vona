import { BeanEventEmitterBase, EventEmitter } from 'vona-module-a-event';

export type TypeEventHelloEchoJobData = unknown;

export type TypeEventHelloEchoJobResult = void;

@EventEmitter()
export class EventEmitterHelloEcho extends BeanEventEmitterBase<
  TypeEventHelloEchoJobData,
  TypeEventHelloEchoJobResult
> {}
