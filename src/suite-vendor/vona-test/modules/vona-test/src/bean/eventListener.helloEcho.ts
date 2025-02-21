import type { IEventExecute, NextEvent } from 'vona-module-a-event';
import type { TypeEventHelloEchoData, TypeEventHelloEchoResult } from './event.helloEcho.ts';
import { BeanBase } from 'vona';
import { EventListener } from 'vona-module-a-event';

@EventListener({ match: 'vona-test:helloEcho' })
export class EventListenerHelloEcho
  extends BeanBase
  implements IEventExecute<TypeEventHelloEchoData, TypeEventHelloEchoResult> {
  async execute(
    data: TypeEventHelloEchoData,
    next: NextEvent<TypeEventHelloEchoData, TypeEventHelloEchoResult>,
  ): Promise<TypeEventHelloEchoResult> {
    // next
    const result = await next();
    return `${data.text} ${result}`;
  }
}
