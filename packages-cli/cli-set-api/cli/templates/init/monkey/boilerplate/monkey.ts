import { BeanSimple, IMonkeyAppInitialize } from 'vona';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize {
  async appInitialize() {}
}
