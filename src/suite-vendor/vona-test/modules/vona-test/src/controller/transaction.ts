import { BeanBase } from 'vona';
import { Body } from 'vona-module-a-openapi';
import { Controller, Post } from 'vona-module-a-web';

const tableName = '__tempTransaction';

@Controller({ path: 'transaction', meta: { mode: 'unittest' } })
export class ControllerTransaction extends BeanBase {
  @Post('fail')
  async fail(@Body() item: object) {
    await this.app.bean.model.update(tableName + 'error', item);
  }

  @Post('success')
  async success(@Body() item: object) {
    await this.app.bean.model.update(tableName, item);
  }
}
