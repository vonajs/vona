import { BeanSimple, IModule, IMonkeyApp } from 'vona';

export class AppMonkey extends BeanSimple implements IMonkeyApp {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
  async metaLoaded(_module: IModule, _meta) {}
}
