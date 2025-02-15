import { BeanSimple, IModuleMain, VonaContext } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';
import { IInstanceConfig } from './config/config.js';

const SymbolInstanceName = Symbol('SymbolInstanceName');

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    const options = this.bean.scope(__ThisModule__).config;
    this.app.context.__getInstanceName = function (this: VonaContext) {
      return __getInstanceName(this, options);
    };
    this.app.context.__setInstanceName = function (this: VonaContext, instanceName: string) {
      return __setInstanceName(this, instanceName);
    };
  }

  async configLoaded(_config: any) {}
}

function __setInstanceName(ctx: VonaContext, instanceName: string | undefined | null) {
  ctx[SymbolInstanceName] = instanceName;
}

function __getInstanceName(ctx: VonaContext, options: IInstanceConfig) {
  if (ctx.hasOwnProperty(SymbolInstanceName)) {
    return ctx[SymbolInstanceName];
  }

  let instanceName;
  if (options.getInstanceName) {
    instanceName = options.getInstanceName(ctx);
  } else {
    instanceName = ctx.subdomains.join('.');
  }

  __setInstanceName(ctx, instanceName);
  return instanceName;
}
