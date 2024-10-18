import { BeanBase } from 'vona';
import { ScopeModule, __ThisModule__ } from '../../../resource/this.js';

export class VersionTest extends BeanBase<ScopeModule> {
  constructor() {
    super(__ThisModule__);
  }

  async run() {
    // why add these test codes
    //   - for force flowHistory.id !== flow.id
    // flowHistory
    let res = await this.scope.model.flowHistory.insert({});
    await this.scope.model.flowHistory.delete({ id: res[0] });
    // flowNodeHistory
    res = await this.scope.model.flowNodeHistory.insert({});
    await this.scope.model.flowNodeHistory.delete({ id: res[0] });
  }
}
