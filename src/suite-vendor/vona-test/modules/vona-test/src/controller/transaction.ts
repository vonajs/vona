import { BeanBase } from 'vona';
import { Transaction } from 'vona-module-a-database';
import { Api, Body } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';

const tableNameFail = '__tempTransactionFail';
const tableNameSuccess = '__tempTransactionSuccess';

@Controller({ path: 'transaction', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerTransaction extends BeanBase {
  @Post('fail')
  @Transaction()
  async fail(@Body() item: object) {
    await this.app.bean.model.update(`${tableNameFail}`, item);
    await this.app.bean.model.update(`${tableNameFail}error`, item);
  }

  @Post('success')
  @Transaction()
  async success(@Body() item: object) {
    await this.app.bean.model.update(tableNameSuccess, item);
  }
}
