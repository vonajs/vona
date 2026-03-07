import type { TableIdentity } from 'table-identity';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServicePaypal extends BeanBase {
  async getRecord(userId: TableIdentity, recordId: TableIdentity) {
    // get record
    const record = await this.scope.model.paypalRecord.getById(recordId);
    console.log(record);
    // check user
    if (!record || record.userId !== userId) {
      this.app.throw(403);
    }
    return record;
  }
}
