import { BeanBase } from 'vona';
import { Database } from 'vona-module-a-database';
import { Service } from 'vona-module-a-web';

const tableNameFail = '__tempTransactionFail';
const tableNameSuccess = '__tempTransactionSuccess';

@Service()
export class ServiceTransaction extends BeanBase {
  @Database.transaction()
  async fail(item: object) {
    await this.app.bean.model.update(`${tableNameFail}`, item);
    await this.app.bean.model.update(`${tableNameFail}error`, item);
  }

  @Database.transaction()
  async success(item: object) {
    await this.app.bean.model.update(tableNameSuccess, item);
  }
}
