import { BeanBase } from 'vona';
import { __ThisModule__ } from '../../../.metadata/this.js';

export class VersionTest extends BeanBase {
  async run() {
    // why add these test codes
    //   - for force flowTaskHistory.id !== flowTask.id
    // flowTaskHistory
    const res = await this.$scope.flowtask.model.flowTaskHistory.insert({});
    await this.$scope.flowtask.model.flowTaskHistory.delete({ id: res[0] });
  }
}
