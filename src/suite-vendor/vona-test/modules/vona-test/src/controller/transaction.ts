import { BeanBase } from 'vona';
import { Api, Body } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';

const tableName = '__tempTransaction';

@Controller({ path: 'transaction', meta: { mode: 'unittest' } })
@Api.exclude()
export class ControllerTransaction extends BeanBase {
  @Post('fail')
  fail(@Body() item: object) {
    return this.app.bean.model.update(tableName + 'error', item);
  }

  @Post('success')
  success(@Body() item: object) {
    return this.app.bean.model.update(tableName, item);
  }
}
