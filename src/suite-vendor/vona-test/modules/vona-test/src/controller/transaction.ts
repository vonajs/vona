import { BeanBase } from 'vona';
import { TransactionMiddleware } from 'vona-module-a-database';
import { Api, Arg } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

const tableNameFail = '__tempTransactionFail';
const tableNameSuccess = '__tempTransactionSuccess';

@Controller({ path: 'transaction', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerTransaction extends BeanBase {
  @Web.post('fail')
  @TransactionMiddleware()
  @Public()
  async fail(@Arg.body() item: object) {
    await this.app.bean.model.update(`${tableNameFail}`, item);
    await this.app.bean.model.update(`${tableNameFail}error`, item);
  }

  @Web.post('success')
  @TransactionMiddleware()
  @Public()
  async success(@Arg.body() item: object) {
    await this.app.bean.model.update(tableNameSuccess, item);
  }
}
