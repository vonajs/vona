import { BeanBase } from 'vona';
import { Api, Body } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';

const tableNameFail = '__tempTransactionFail';
const tableNameSuccess = '__tempTransactionSuccess';

@Controller({ path: 'transaction', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerTransaction extends BeanBase {
  @Post('fail')
  fail(@Body() item: object) {
    return this.app.bean.model.update(`${tableNameFail}error`, item);
  }

  @Post('success')
  success(@Body() item: object) {
    return this.app.bean.model.update(tableNameSuccess, item);
  }
}
