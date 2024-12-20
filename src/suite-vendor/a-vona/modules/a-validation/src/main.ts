import { BeanSimple, IModuleMain } from 'vona';
import { errorsAdapter } from './lib/zod/errorsAdapter.js';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    if (this.app.meta.inApp) {
      errorsAdapter(this.app);
    }
  }
  async configLoaded(_config: any) {}
}
