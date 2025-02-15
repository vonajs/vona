import assert from 'node:assert';
import { BeanBroadcastBase, Broadcast, type IBroadcastExecute } from 'vona-module-a-broadcast';

export type TypeBroadcastTestJobData = {
  message: string;
};

@Broadcast()
export class BroadcastTest
  extends BeanBroadcastBase<TypeBroadcastTestJobData>
  implements IBroadcastExecute<TypeBroadcastTestJobData> {
  async execute(data: TypeBroadcastTestJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      // do something
    }
    // locale
    assert.equal(this.ctx.locale, 'zh-cn');
    // data
    assert.equal(data.message, 'hello');
  }
}
