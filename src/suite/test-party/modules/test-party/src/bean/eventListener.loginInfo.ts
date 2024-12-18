import { BeanBase } from 'vona';
import { TypeEventLoginInfoData, TypeEventLoginInfoResult } from 'vona-module-a-base';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';

@EventListener({ match: 'a-base:loginInfo' })
export class EventListenerLoginInfo
  extends BeanBase
  implements IEventExecute<TypeEventLoginInfoData, TypeEventLoginInfoResult>
{
  async execute(
    data: TypeEventLoginInfoData,
    next: NextEvent<TypeEventLoginInfoData, TypeEventLoginInfoResult>,
  ): Promise<TypeEventLoginInfoResult> {
    const info = data.info;
    const provider = info.user && info.user.provider;
    if (provider && provider.module === 'a-authgithub' && provider.providerName === 'authgithub') {
      info.config = this.app.bean.util.extend(info.config, {
        modules: {},
      });
    }
    // next
    return next();
  }
}
