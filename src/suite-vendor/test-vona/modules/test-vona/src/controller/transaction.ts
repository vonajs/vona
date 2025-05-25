import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Database } from 'vona-module-a-database';
import { Api, Arg } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';

import { Controller, Web } from 'vona-module-a-web';

const tableNameFail = '__tempTransactionFail';
const tableNameSuccess = '__tempTransactionSuccess';
export interface IControllerOptionsTransaction extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsTransaction>({ path: 'transaction', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerTransaction extends BeanBase {
  @Web.post('fail')
  @Database.transaction()
  @Passport.public()
  async fail(@Arg.body() item: object) {
    await this.app.bean.model.update(`${tableNameFail}`, item);
    await this.app.bean.model.update(`${tableNameFail}error`, item);
  }

  @Web.post('success')
  @Database.transaction()
  @Passport.public()
  async success(@Arg.body() item: object) {
    await this.app.bean.model.update(tableNameSuccess, item);
  }
}
