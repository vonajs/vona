import { BeanBase } from 'vona';
import { TypeEventAccountMigrationData, TypeEventAccountMigrationResult } from 'vona-module-a-base';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';

@EventListener({ match: 'a-base:accountMigration' })
export class EventListenerAccountMigration
  extends BeanBase
  implements IEventExecute<TypeEventAccountMigrationData, TypeEventAccountMigrationResult>
{
  async execute(
    data: TypeEventAccountMigrationData,
    next: NextEvent<TypeEventAccountMigrationData, TypeEventAccountMigrationResult>,
  ): Promise<TypeEventAccountMigrationResult> {
    const modelAuthSimple = this.scope.model.authSimple;
    // check userIdFrom
    const authSimple = await modelAuthSimple.get({ userId: data.userIdFrom });
    if (authSimple) {
      // delete old record
      await modelAuthSimple.delete({ userId: data.userIdTo });
      // update
      await modelAuthSimple.update(
        { userId: data.userIdTo },
        {
          where: {
            userId: data.userIdFrom,
          },
        },
      );
    }
    // next
    return next();
  }
}
