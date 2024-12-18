import { BeanBase } from 'vona';
import { TypeEventAccountMigrationData, TypeEventAccountMigrationResult } from 'vona-module-a-base';
import { EventListener, IEventExecute, NextEvent } from 'vona-module-a-event';

@EventListener({ match: 'a-base:accountMigration' })
export class EventListenerAccountMigration
  extends BeanBase
  implements IEventExecute<TypeEventAccountMigrationData, TypeEventAccountMigrationResult>
{
  get modelAuthOpen() {
    return this.scope.model.authOpen;
  }

  async execute(
    data: TypeEventAccountMigrationData,
    next: NextEvent<TypeEventAccountMigrationData, TypeEventAccountMigrationResult>,
  ): Promise<TypeEventAccountMigrationResult> {
    // delete aAuthOpen/aAuth
    const items = await this.modelAuthOpen.select({
      where: { userId: data.userIdFrom },
    });
    for (const item of items) {
      await this.app.bean.atom.delete({ key: { atomId: item.atomId } });
    }
    // next
    return next();
  }
}
