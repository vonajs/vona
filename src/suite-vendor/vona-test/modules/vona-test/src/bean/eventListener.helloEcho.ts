import { BeanBase, Next } from 'vona';
import { EventListener, IEventExecute } from 'vona-module-a-event';
import { TypeEventHelloEchoData, TypeEventHelloEchoResult } from './eventEmitter.helloEcho.js';

@EventListener({ match: 'vona-test:helloEcho' })
export class EventListenerHelloEcho
  extends BeanBase
  implements IEventExecute<TypeEventHelloEchoData, TypeEventHelloEchoResult>
{
  async execute(_data: TypeEventHelloEchoData, next: Next): Promise<TypeEventHelloEchoResult> {
    // next
    return next();
  }
}
