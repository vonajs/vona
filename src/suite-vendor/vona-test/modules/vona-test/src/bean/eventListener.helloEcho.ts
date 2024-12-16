import { BeanBase } from 'vona';
import { EventListener, IEventExecute } from 'vona-module-a-event';

@EventListener({ match: 'some-event-name' })
export class EventListenerHelloEcho
  extends BeanBase
  implements IEventExecute<TypeEventHelloEchoData, TypeEventHelloEchoResult>
{
  async execute(_data: TypeEventHelloEchoData): Promise<TypeEventHelloEchoResult> {}
}
