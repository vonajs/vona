import { BeanSimple, IModuleMain } from 'vona';
import { errorsAdapter } from './decorator/zod-errors-adapter.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    errorsAdapter(this.app);
  }
  async configLoaded(_config: any) {}
}
