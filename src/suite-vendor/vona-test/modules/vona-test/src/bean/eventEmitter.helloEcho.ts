import { BeanEventEmitterBase, EventEmitter } from 'vona-module-a-event';

export type TypeEventHelloEchoData = {
  text: string;
};

export type TypeEventHelloEchoResult = string;

@EventEmitter()
export class EventEmitterHelloEcho extends BeanEventEmitterBase<TypeEventHelloEchoData, TypeEventHelloEchoResult> {}
