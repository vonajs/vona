import { BeanEventEmitterBase, IEventExecute, EventEmitter } from 'vona-module-a-event';

export type TypeEventEmitterHelloEchoJobData = unknown;

export type TypeEventEmitterHelloEchoJobResult = void;

@EventEmitter()
export class EventEmitterHelloEcho
  extends BeanEventEmitterBase<TypeEventEmitterHelloEchoJobData, TypeEventEmitterHelloEchoJobResult>
  implements IEventExecute<TypeEventEmitterHelloEchoJobData, TypeEventEmitterHelloEchoJobResult>
{
  async execute(_data: TypeEventEmitterHelloEchoJobData): Promise<TypeEventEmitterHelloEchoJobResult> {}
}
