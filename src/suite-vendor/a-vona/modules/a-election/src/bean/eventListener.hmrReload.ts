import type { IEventExecute, NextEvent } from 'vona-module-a-event';
import { BeanBase } from 'vona';
import { EventListener } from 'vona-module-a-event';

type TypeEventData = unknown; // TypeEventHmrReloadData;
type TypeEventResult = unknown; // TypeEventHmrReloadResult;

@EventListener({ match: 'some-module:hmrReload' })
export class EventListenerHmrReload
  extends BeanBase
  implements IEventExecute<TypeEventData, TypeEventResult>
{
  async execute(_data: TypeEventData, next: NextEvent<TypeEventData, TypeEventResult>): Promise<TypeEventResult> {
    // next
    return next();
  }
}
