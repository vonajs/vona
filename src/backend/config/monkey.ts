import type { IModule } from '@cabloy/module-info';
import type { IMonkeyModule, IMonkeySystem } from 'vona';
import { BeanSimple } from 'vona';

export class AppMonkey extends BeanSimple implements IMonkeyModule, IMonkeySystem {
  async moduleLoading(_module: IModule) {
    console.log('------ssss----');
  }

  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config: any) {
    console.log('------ssss----');
  }

  async appStart() {
    console.log('------ssss----');
  }

  async appReady() {}
  async appStarted() {}
  async appClose() {}
  async appClosed() {}
}
