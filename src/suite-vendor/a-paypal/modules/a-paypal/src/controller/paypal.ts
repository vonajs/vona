import type { TableIdentity } from 'table-identity';
import type { IUser } from 'vona-module-a-user';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapiutils';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { EntityPaypalRecord } from '../entity/paypalRecord.tsx';

export interface IControllerOptionsPaypal extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPaypal>('paypal')
export class ControllerPaypal extends BeanBase {
  @Web.get('getRecord/:id')
  @Api.body(EntityPaypalRecord)
  async getRecord(
    @Arg.user() user: IUser,
    @Arg.param('id', v.tableIdentity()) recordId: TableIdentity,
  ): Promise<EntityPaypalRecord> {
    return this.scope.service.paypal.getRecord(user.id, recordId);
  }
}
