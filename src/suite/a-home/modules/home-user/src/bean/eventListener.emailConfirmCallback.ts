import type { IEventExecute, NextEvent } from 'vona-module-a-event';
import type { TypeEventEmailConfirmCallbackData, TypeEventEmailConfirmCallbackResult } from 'vona-module-a-mailconfirm';
import { BeanBase } from 'vona';
import { EventListener } from 'vona-module-a-event';

type TypeEventData = TypeEventEmailConfirmCallbackData;
type TypeEventResult = TypeEventEmailConfirmCallbackResult;

@EventListener({ match: 'a-mailconfirm:emailConfirmCallback' })
export class EventListenerEmailConfirmCallback
  extends BeanBase
  implements IEventExecute<TypeEventData, TypeEventResult> {
  async execute(_data: TypeEventData, next: NextEvent<TypeEventData, TypeEventResult>): Promise<TypeEventResult> {
    // next
    return next();
  }
}
