import type { IMonkeyAppClose } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

export class Monkey extends BeanSimple implements IMonkeyAppClose {
  async appClose() {
    const scopeSelf = this.bean.scope(__ThisModule__);
    await scopeSelf.service.election.dispose();
  }
}
