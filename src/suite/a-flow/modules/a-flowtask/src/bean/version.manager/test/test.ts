import { BeanBase } from 'vona';
import { ScopeModule, __ThisModule__ } from '../../../resource/this.js';

export class VersionTest extends BeanBase<ScopeModule> {
  constructor() {
    super(__ThisModule__);
  }

  async run() {
    // why add these test codes
    //   - for force flowTaskHistory.id !== flowTask.id
    // flowTaskHistory
    const res = await this.scope.model.flowTaskHistory.insert({});
    await this.scope.model.flowTaskHistory.delete({ id: res[0] });
  }
}
