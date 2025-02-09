import { BeanSimple, IModuleMain } from 'vona';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    // force broadcast init
    this.bean._getBean('a-broadcast.service.broadcast');
  }
  async configLoaded(_config: any) {}
}
