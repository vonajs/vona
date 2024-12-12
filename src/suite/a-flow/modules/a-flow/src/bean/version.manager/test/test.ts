import { BeanBase } from 'vona';
import { __ThisModule__ } from '../../../.metadata/this.js';

export class VersionTest extends BeanBase {
  async run() {
    // why add these test codes
    //   - for force flowHistory.id !== flow.id
    // flowHistory
    let res = await this.$scope.flow.model.flowHistory.insert({});
    await this.$scope.flow.model.flowHistory.delete({ id: res[0] });
    // flowNodeHistory
    res = await this.$scope.flow.model.flowNodeHistory.insert({});
    await this.$scope.flow.model.flowNodeHistory.delete({ id: res[0] });
  }
}
