import { BeanBase } from 'vona';
import { TypeEventLoginInfoData, TypeEventLoginInfoResult } from 'vona-module-a-base';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';

@EventListener({ match: 'a-base:loginInfo' })
export class EventListenerLoginInfoDashboard
  extends BeanBase
  implements IEventExecute<TypeEventLoginInfoData, TypeEventLoginInfoResult>
{
  async execute(
    data: TypeEventLoginInfoData,
    next: NextEvent<TypeEventLoginInfoData, TypeEventLoginInfoResult>,
  ): Promise<TypeEventLoginInfoResult> {
    const info = data.info;
    info.config = this.app.bean.util.extend(info.config, {
      modules: {},
    });
    // next
    return next();
  }
}
