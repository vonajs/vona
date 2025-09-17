import type { IEventExecute, NextEvent } from 'vona-module-a-event';
import type { IUserBase, TypeEventActivateData, TypeEventActivateResult } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { EventListener } from 'vona-module-a-event';

type TypeEventData = TypeEventActivateData;
type TypeEventResult = TypeEventActivateResult;

@EventListener({ match: 'a-user:activate' })
export class EventListenerActivate
  extends BeanBase
  implements IEventExecute<TypeEventData, TypeEventResult> {
  async execute(data: TypeEventData, next: NextEvent<TypeEventData, TypeEventResult>): Promise<TypeEventResult> {
    const user = data as IUserBase;
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
