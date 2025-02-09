import { BeanSimple, IMonkeyAppStarted } from 'vona';

export class Monkey extends BeanSimple implements IMonkeyAppStarted {
  async appStarted() {
    console.log('sssssssss');
  }
}
