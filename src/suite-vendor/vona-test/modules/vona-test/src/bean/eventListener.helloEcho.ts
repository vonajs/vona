import { BeanBase } from 'vona';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';
import { TypeEventHelloEchoData, TypeEventHelloEchoResult } from './event.helloEcho.js';

@EventListener({ match: 'vona-test:helloEcho' })
export class EventListenerHelloEcho
  extends BeanBase
  implements IEventExecute<TypeEventHelloEchoData, TypeEventHelloEchoResult>
{
  async execute(
    data: TypeEventHelloEchoData,
    next: NextEvent<TypeEventHelloEchoData, TypeEventHelloEchoResult>,
  ): Promise<TypeEventHelloEchoResult> {
    // next
    const result = await next();
    return `${data.text} ${result}`;
  }
}
