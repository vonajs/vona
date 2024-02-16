import { TestCtx0 } from './test.ctx_0.js';

export class TestCtx1 extends TestCtx0 {
  async actionAsync3({ a, b }: any) {
    return await this.actionAsync2({ a, b });
  }
}
