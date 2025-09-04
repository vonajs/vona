import type { IEventExecute, NextEvent } from 'vona-module-a-event';
import type { TypeEventActivateData, TypeEventActivateResult } from 'vona-module-a-user';
import type { IUser } from '../types/user.ts';
import { BeanBase } from 'vona';
import { EventListener } from 'vona-module-a-event';

type TypeEventData = TypeEventActivateData;
type TypeEventResult = TypeEventActivateResult;

@EventListener({ match: 'a-user:activate' })
export class EventListenerActivate
  extends BeanBase
  implements IEventExecute<TypeEventData, TypeEventResult> {
  async execute(data: TypeEventData, next: NextEvent<TypeEventData, TypeEventResult>): Promise<TypeEventResult> {
    const user = data as IUser;
    if (user.name === 'admin') {
      // role: admin
      const roleAdmin = await this.scope.model.role.get({ name: 'admin' });
      // userRole: admin
      await this.scope.model.roleUser.insert({
        userId: user.id,
        roleId: roleAdmin!.id,
      });
    }
    // next
    return next();
  }
}
