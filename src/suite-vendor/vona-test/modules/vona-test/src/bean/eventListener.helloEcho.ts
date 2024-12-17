import { BeanBase, Next } from 'vona';
import { EventListener, IEventExecute } from 'vona-module-a-event';
import { TypeEventHelloEchoArgs, TypeEventHelloEchoResult } from './event.helloEcho.js';

@EventListener({ match: 'vona-test:helloEcho' })
export class EventListenerHelloEcho
  extends BeanBase
  implements IEventExecute<TypeEventHelloEchoArgs, TypeEventHelloEchoResult>
{
  async execute(_args: TypeEventHelloEchoArgs, next: Next): Promise<TypeEventHelloEchoResult> {
    // next
    return next();
  }
}
