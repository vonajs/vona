import { IModule } from '@cabloy/module-info';
import { BeanSimple, IMonkeyModule } from 'vona';

export class Monkey extends BeanSimple implements IMonkeyModule {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config: any) {}
}
