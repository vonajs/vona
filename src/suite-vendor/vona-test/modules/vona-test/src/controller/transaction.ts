import { BeanBase, Controller, Post } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { Body } from 'vona-module-a-validator';

const tableName = '__tempTransaction';

@Controller('transaction')
export class ControllerTransaction extends BeanBase<ScopeModule> {
  @Post('fail')
  async fail(@Body() item: object) {
    await this.app.bean.model.update(tableName + 'error', item);
  }

  @Post('success')
  async success(@Body() item: object) {
    await this.app.bean.model.update(tableName, item);
  }
}
