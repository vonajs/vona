import type { IMonkeyAppClose, IMonkeyAppClosed } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

export class Monkey extends BeanSimple implements IMonkeyAppClose, IMonkeyAppClosed {
  async appClose() {
    const scopeSelf = this.bean.scope(__ThisModule__);
    await scopeSelf.service.broadcast.disposeSub();
  }

  async appClosed() {
    const scopeSelf = this.bean.scope(__ThisModule__);
    await scopeSelf.service.broadcast.disposePub();
  }
}
