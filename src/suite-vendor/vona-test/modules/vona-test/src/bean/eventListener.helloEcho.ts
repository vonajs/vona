import { BeanBase } from 'vona';
import { IEventExecute, EventListener } from 'vona-module-a-event';
import { TypeEventHelloEchoJobData, TypeEventHelloEchoJobResult } from './eventEmitter.helloEcho.js';

@EventListener()
export class EventListenerHelloEcho
  extends BeanBase
  implements IEventExecute<TypeEventHelloEchoJobData, TypeEventHelloEchoJobResult>
{
  async execute(_data: TypeEventHelloEchoJobData): Promise<TypeEventHelloEchoJobResult> {}
}
