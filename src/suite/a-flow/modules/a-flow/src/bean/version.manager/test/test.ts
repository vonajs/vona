import { BeanBase } from '@cabloy/core';

export class VersionTest extends BeanBase {
  async run() {
    // why add these test codes
    //   - for force flowHistory.id !== flow.id
    // flowHistory
    let res = await this.bean.model.flowHistory.insert({});
    await this.bean.model.flowHistory.delete({ id: res[0] });
    // flowNodeHistory
    res = await this.bean.model.flowNodeHistory.insert({});
    await this.bean.model.flowNodeHistory.delete({ id: res[0] });
  }
}
