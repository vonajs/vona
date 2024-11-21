import { BeanSimple, IModuleMain } from 'vona';
import { errorsAdapter } from '@cabloy/zod-errors-custom';

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    errorsAdapter(this.app);
  }
  async configLoaded(_config: any) {}
}
