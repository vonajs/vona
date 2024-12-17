import assert from 'assert';
import { BeanBase } from 'vona';
import { TypeEventUserVerifyData, TypeEventUserVerifyResult } from 'vona-module-a-base';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';

@EventListener({ match: 'a-base:userVerify' })
export class EventListenerUserVerify
  extends BeanBase
  implements IEventExecute<TypeEventUserVerifyData, TypeEventUserVerifyResult>
{
  async execute(
    data: TypeEventUserVerifyData,
    next: NextEvent<TypeEventUserVerifyResult>,
  ): Promise<TypeEventUserVerifyResult> {
    assert(data.profileUser.profileId > 0);
    // next
    return next();
  }
}
