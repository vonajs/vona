import { BeanEventEmitterBase, EventEmitter } from 'vona-module-a-event';

export type TypeEventHelloEchoData = unknown;

export type TypeEventHelloEchoResult = void;

@EventEmitter()
export class EventEmitterHelloEcho extends BeanEventEmitterBase<TypeEventHelloEchoData, TypeEventHelloEchoResult> {}
