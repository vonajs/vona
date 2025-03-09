import { BeanBase } from 'vona';
import { TransactionMiddleware } from 'vona-module-a-database';
import { Api, Body } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Post } from 'vona-module-a-web';

const tableNameFail = '__tempTransactionFail';
const tableNameSuccess = '__tempTransactionSuccess';

@Controller({ path: 'transaction', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerTransaction extends BeanBase {
  @Post('fail')
  @TransactionMiddleware()
  @Public()
  async fail(@Body() item: object) {
    await this.app.bean.model.update(`${tableNameFail}`, item);
    await this.app.bean.model.update(`${tableNameFail}error`, item);
  }

  @Post('success')
  @TransactionMiddleware()
  @Public()
  async success(@Body() item: object) {
    await this.app.bean.model.update(tableNameSuccess, item);
  }
}
