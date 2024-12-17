import { BeanBase } from 'vona';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';
import { TypeEventHelloEchoData, TypeEventHelloEchoResult } from './event.helloEcho.js';

@EventListener({ match: 'vona-test:helloEcho' })
export class EventListenerHelloEcho
  extends BeanBase
  implements IEventExecute<TypeEventHelloEchoData, TypeEventHelloEchoResult>
{
  async execute(
    _data: TypeEventHelloEchoData,
    next: NextEvent<TypeEventHelloEchoResult>,
  ): Promise<TypeEventHelloEchoResult> {
    // next
    return next();
  }
}
