import { BeanBase } from 'vona';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';
import { TypeEventHelloEchoArgs, TypeEventHelloEchoResult } from './event.helloEcho.js';

@EventListener({ match: 'vona-test:helloEcho' })
export class EventListenerHelloEcho
  extends BeanBase
  implements IEventExecute<TypeEventHelloEchoArgs, TypeEventHelloEchoResult>
{
  async execute(
    _args: TypeEventHelloEchoArgs,
    next: NextEvent<TypeEventHelloEchoResult>,
  ): Promise<TypeEventHelloEchoResult> {
    // next
    return next();
  }
}
